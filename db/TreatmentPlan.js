// Requires
const { client } = require('./Index');
const bcrypt = require('bcrypt');

// createTreatmentPlan
async function createTreatmentPlan({plan, patient_id, provider_id}) {
    try {
        const { rows: [treatment_plan] } = await client.query(`
            INSERT INTO treatment_plan(plan, patient_id, provider_id)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [plan, patient_id, provider_id]);
        
        return treatment_plan
    } catch (error) {
        console.log(error)
    }
};

// getAllTreatmentPlan
async function getAllTreatmentPlan() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM treatment_plan;
        `,);
        
        return rows
    } catch (error) {
        console.log(error)
    }
};

// getTreatmentPlanById
async function getTreatmentPlanById(id) {
    try {
        const { rows: [ treatment_plan ] } = await client.query(`
        SELECT *
        FROM treatment_plan
        WHERE id= $1;
        `,[id]);

        if (!treatment_plan) {
            return null
        }
        return treatment_plan;
    } catch (error) {
        console.log(error)
    }
};

// getTreatmentPlanByPatientId
async function getTreatmentPlanByPatientId(patient_id) {
    try {
        const { rows: [ treatment_plan ] } = await client.query(`
        SELECT *
        FROM treatment_plan
        WHERE patient_id= $1;
        `,[patient_id]);

        return treatment_plan;
    } catch (error) {
        console.log(error)
    }
};

// getTreatmentPlanByProviderId
async function getTreatmentPlanByProviderId(provider_Id) {
    try {
        const { rows: [ treatment_plan ] } = await client.query(`
        SELECT *
        FROM treatment_plan
        WHERE provider_Id= $1;
        `,[provider_Id]);

        return treatment_plan;
    } catch (error) {
        console.log(error)
    }
};

// destroyTreatmentPlan
async function destroyTreatmentPlan(id){
    try {
        await client.query(`
            DELETE
            FROM treatment_plan
            WHERE "id" = $1;
            `, [id]);
    } catch (error) {
        console.log(error)
    }
};

// updateTreatmentPlan
async function updateTreatmentPlan(id, fields = {}) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");
  
    if (setString.length === 0) {
        return;
    }
  
    try {
        const { rows: [treatment_plan] } = await client.query(`
            UPDATE treatment_plan
            SET ${setString}
            WHERE "id"='${id}'
            RETURNING *;
        `, Object.values(fields));
  
        return treatment_plan;
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    createTreatmentPlan,
    getAllTreatmentPlan,
    getTreatmentPlanById,
    getTreatmentPlanByPatientId,
    getTreatmentPlanByProviderId,
    destroyTreatmentPlan,
    updateTreatmentPlan
};