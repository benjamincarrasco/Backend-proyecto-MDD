"use strict";
import { VotingEntity } from "../entity/voting.entity.js";
import { VoteEntity } from "../entity/vote.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createVotingValidation, voteValidation } from "../validations/voting.validation.js";
import { scheduleJob } from "node-schedule";

export async function createVoting(req, res) {
  try {
    // Validar que el usuario sea administrador
    if (req.user.role !== "administrador") {
      return res.status(403).json({
        message: "Solo los administradores pueden crear votaciones",
      });
    }

    // Validar datos de entrada
    const { error } = createVotingValidation.validate(req.body);  // Valida q los datos de body esten correctos
    if (error) {
      return res.status(400).json({ message: error.message }); // si hay un error returna el mensaje con el error
    }

    const { title, description, endDate } = req.body;  // Saca el titulo, descripcion y fecha de termino de la votacion
    const votingRepository = AppDataSource.getRepository(VotingEntity);   

    // Crear nueva votación
    
    //Se guarda el titulo, descripcion, fecha de cierre y quien la creó
    const newVoting = votingRepository.create({
      title,
      description,
      endDate: new Date(endDate),
      createdBy: req.user.id,
    });


    await votingRepository.save(newVoting);  //guarda la nueva votacion en la bd

    // Programar cierre automático
    scheduleJob(new Date(endDate), async () => {      //Convierte la fecha final de la votacion en un objeto fecha
      await votingRepository.update(newVoting.id, { isActive: false });  //se busca la votacion x su id y se le cambia el isActive a false para que se cierre
      console.log(`Votación ${newVoting.id} cerrada automáticamente`);  //imprime la votacion y su id con el mensaje de cerrada automatica...
    });

    res.status(201).json({
      message: "Votación creada exitosamente",
      data: newVoting,
    });
  } catch (error) {
    console.error("Error al crear votación:", error);
    res.status(500).json({ message: "Error al crear votación" });
  }
}
    //Devuelve las votaciones activas
export async function getActiveVotings(req, res) {
  try {
    const votingRepository = AppDataSource.getRepository(VotingEntity);  //crea el acceso a la tabla votaciones en la bd
    const votings = await votingRepository.find({       //busca varias filas, en el objeto dice como filtrar
      where: { isActive: true },    // que esté activa
      relations: ["createdBy"],     //Que traiga la informacion de quien la creo
      order: { createdAt: "DESC" },  //Ordena de la mas reciente a la mas antigua
    });
      //Devuelve la lista de las votaciones activas
    res.status(200).json({
      message: "Votaciones activas obtenidas",
      data: votings,
    });
  } catch (error) {
    console.error("Error al obtener votaciones:", error);
    res.status(500).json({ message: "Error al obtener votaciones" });
  }
}

export async function castVote(req, res) {
  try {
    // Validar que el usuario sea estudiante con correo institucional
    if (!req.user.email.endsWith("@alumnos.ubiobio.cl")) { //Verifica q el correo del usuario termine en lo indicado
      return res.status(403).json({
        message: "Solo Alumnos pueden votar",
      });
    }

    // Validar datos de entrada
    const { error } = voteValidation.validate(req.body);  //revisa q el voto esté bien
    if (error) {  //si está mal devuelve el mensaje con el error
      return res.status(400).json({ message: error.message });
    }

    const { votingId } = req.params;   //Saca la id de la votacion 
    const { opcion } = req.body;    // Y la opcion que eligió el alumno
    const voteRepository = AppDataSource.getRepository(VoteEntity);
    const votingRepository = AppDataSource.getRepository(VotingEntity);

    // Verificar si la votación existe y está activa
    const voting = await votingRepository.findOne({
      where: { id: votingId, isActive: true },
    });
    if (!voting) {
      return res.status(404).json({
        message: "Votación no encontrada o no está activa",
      });
    }

    // Verificar si el usuario ya votó
    const existingVote = await voteRepository.findOne({  //Busca el voto coon lo siguiente
      where: { voting: { id: votingId }, user: { id: req.user.id } }, //
    });
    if (existingVote) {
      return res.status(400).json({
        message: "Su voto ya ha sido registrado",
      });
    }

    // Registrar el voto
    const newVote = voteRepository.create({       //Crea un nuevo objeto de voto con 
      opcion,       //Su opcion (si/no)
      voting: { id: votingId }, //ID de la votacion
      user: { id: req.user.id },    //Id del usuario que vota
    });
    await voteRepository.save(newVote);

    // Actualizar conteo de votos
    const votosSi = await voteRepository.count({
      where: { voting: { id: votingId }, opcion: "si" },
    });
    const votosNo = await voteRepository.count({
      where: { voting: { id: votingId }, opcion: "no" },
    });

    await votingRepository.update(votingId, {
      votosSi,
      votosNo,
      totalVotes: votosNo + votosSi,
    });

    res.status(201).json({
      message: "Voto registrado exitosamente",
    });
  } catch (error) {
    console.error("Error al registrar voto:", error);
    res.status(500).json({ message: "Error al registrar voto" });
  }
}
    //Muestra los resultados de una votacion
export async function getVotingResults(req, res) {
  try {
    const { votingId } = req.params;
    const votingRepository = AppDataSource.getRepository(VotingEntity);

    const voting = await votingRepository.findOne({
      where: { id: votingId },
      relations: ["createdBy"],
    });

    if (!voting) {
      return res.status(404).json({
        message: "Votación no encontrada",
      });
    }

    res.status(200).json({
      message: "Resultados de votación obtenidos",
      data: voting,
    });
  } catch (error) {
    console.error("Error al obtener resultados:", error);
    res.status(500).json({ message: "Error al obtener resultados" });
  }
}


//RECIEN AÑADIDAS

// Cerrar votación
export async function closeVoting(req, res) {
  try {
    const { votingId } = req.params;    //toma la id de la votacion que viene en la URL
    const votingRepository = AppDataSource.getRepository(VotingEntity); 
    
    await votingRepository.update(votingId, { isActive: false });   //busca la votacion con ese id y le cambia el campo isActive a false para cerrarla
    
    res.status(200).json({ 
      message: "Votación cerrada exitosamente" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al cerrar votación" 
    });
  }
}

// Eliminar votación
export async function deleteVoting(req, res) {
  try {
    const { votingId } = req.params;
    const votingRepository = AppDataSource.getRepository(VotingEntity);
    
    await votingRepository.delete(votingId);
    
    res.status(200).json({ 
      message: "Votación eliminada exitosamente" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar votación" 
    });
  }
}