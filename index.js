  /*
      IMPORT ET INITIALISATION DES VARIABLES
  */


import{ TRAVELERDAO, TRAVEL } from './model/DAO.mjs'
import  sqlite3  from 'sqlite3'
sqlite3.verbose()
import { open } from 'sqlite'
import express from 'express'
const app = express()

//const travelRooter = require('./root')
//import rooter  from './root.js'


  /*
      POUR L'IMPORT DU FICHIER ROOT
  */



//app.use(`${chemin}`, travelRooter)


  /*
      CONNEXION A LA BASE DE DONNEE
  */

const db = await open({
  filename: 'master.db',
  driver: sqlite3.Database
})


  /*
      CREATION DES OBJETS DE LA CLASSE TRAVELER DAO ET TRAVEL
  */


const travelerDAO = new TRAVELERDAO(db)
const travelDAO = new TRAVEL(db)


  /*
      TEST FONCTION DAO (UPDATE, CREATE, DELETE, GET)
  */


//console.log(await DAO.get(5)) // Obtenir l'id 7
//console.log(await DAO.getall()) // Obtenir l'id 7
//console.log(await DAO.create('Bler', 'Pop', 'Male')) // Créer un voyageur sous la forme (prénom ; nom ; sexe)
//console.log(await DAO.delete(13)) // supprime un voyageur
//console.log(await DAO.update("Male",14)) // Met à jours un voyageur (son id ; prenom ; nom ; sexe)


  /*
    VERBE HTTP : POST ; PUT ; GET ; DELETE ; PATCH
  
  */
    
  app.get(`/traveler`, async (req, res)=> {
    let traveler = await travelerDAO.get(req.query['d'])
    res.json({
      message: traveler
    })
  })

  app.post(`/newTraveler`, async (req, res)=> { 
    res.send(req.query)
    let newTraveler = await travelerDAO.create(req.params.prenom,req.params.nom,req.params.gender)
    res.status(201).send('Votre nouveau voyageur a été crée.')
  })

  app.put(`/updateTraveler`, async (req, res)=> {
    res.send(req.query)
   let updateTraveler = await travelerDAO.update(req.params.prenom,req.params.nom,req.params.gender)
   //let sql = `SELECT * FROM TRAVELER ORDER BY id DESC`
   //console.log(updateTraveler)
   //console.log(sql)
   res.status(200).send('Votre voyageur a été modifié.')
  })
  
  app.delete(`/traveler`, async (req, res)=>{
    res.send(req.query)
    res.status(200).send('Votre voyageur a été supprimé.')
  })


  /*
    AFFICHAGE DU PORT 3000
  */


  app.listen('3000', function () {
   console.log("Server launch");
  });  