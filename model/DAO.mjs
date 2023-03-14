class TRAVELERDAO
{
    db = null // à vérifier
    constructor(db){
        this.db = db
        
    }
        
    async getall(){
        const all = await this.db.all('SELECT * FROM TRAVELER')
        return `Les voyageurs à l'identifiant ${all} ont été identifié`
    }

    async get(id){
        console.log(this.db)
        const result = await this.db.get('SELECT * FROM TRAVELER WHERE id = ' + id)
        return `Le voyageur à l'identifiant ${id} et qui porte le nom ` + result['first_name'] + ' ' + result['last_name'] + ' ' +  `a été identifié`
    }

    async create(firstname, lastname, gender){
        const result = await this.db.run('INSERT INTO TRAVELER(first_name, last_name, gender) VALUES (:first_name, :last_name, :gender)', {
            ':first_name' : firstname,
            ':last_name' : lastname,
            ':gender' : gender
        })
    }

    async update(gender, id){
        const updt = await this.db.prepare('UPDATE TRAVELER SET gender = ? WHERE id = ?')
        await updt.bind({1:gender, 2:id})
        await updt.run()
        return `Le voyageur à l'identifiant ${id} a été modifié`
    }

    async delete(id){
        const del = await this.db.run('DELETE FROM TRAVELER WHERE id = ' + id)
        return `Le voyageur à l'identifiant ${id} a été supprimé`
    }
    
}

class TRAVEL
{
    
}

export{TRAVEL, TRAVELERDAO}