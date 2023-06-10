const {Router} =require('express')
const pool = require('../config/db')
const router =Router()  

/////////  Create
router.post('/add',async(req,res)=>{
    try {
        const {name,degree,job_id} =req.body;
        const newemployer= await pool.query(
            `insert into employer (name,degree,job_id) values ($1,$2,$3) returning *`,
            [name,degree,job_id]);
            res.status(201).json(newemployer.rows)
    } catch (error) {
       res.status(500).json({message:error.message})
    }
})

/////////  Read
router.get('/',async (req,res)=>{
    try {
        const employer= await pool.query('select *  from employer')
        res.status(200).json(employer.rows)
    } catch (error) {
        res.status(500).json({messege:error.messege})
    }
})

/////////  Update
router.put('/:id',async(req,res)=>{
    try {
        const {id} =req.params;
        // console.log(id);
        const {name,degree,job_id} =req.body;

        const oldemployer= await pool.query('select * from employer where id=$1',[id])

        const updatedemployer= await pool.query(
            `update employer set name=$1, degree=$2, job_id=$3 where id=$4 returning *`,
            [
                name ? name :oldemployer.rows[0].name,
                degree ? degree : oldemployer.rows[0].degree,
                job_id ? job_id : oldemployer.rows[0].job_id,
                id]);
            res.status(200).json(updatedemployer.rows)
    } catch (error) {
       res.status(500).json({message:error.message})
    }
})

////////  Delete
router.delete('/:id',async(req,res)=>{
    try {
        await pool.query('delete from employer where id=$1',[req.params.id])
        res.status(200).json({messege:"employer Deleted"})
    } catch (error) {
        res.status(500).json(
            {message:error.message}
        )
    }
})
 

module.exports=router
