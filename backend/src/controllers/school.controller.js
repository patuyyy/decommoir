const express = require('express');

const router = express.Router();

const schoolRepository = require('../repositories/school.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');
async function getAllSchools(req, res) {
    try {
        const schools = await schoolRepository.getAllSchools();
        successResponse(res, 200, "Schools successfully retrieved", schools);
    } catch (error) {
        errorResponse(res, 500, "Failed to retrieve schools", error);
    }
}

const getSchoolById = async (req, res) => {
    const { id } = req.params;
    try {
        const school = await schoolRepository.getSchoolById(id);
        if (school) {
            successResponse(res, 200, "School successfully retrieved", school);
        } else {
            errorResponse(res, 404, "School not found");
        }
    } catch (error) {
        errorResponse(res, 500, "Failed to retrieve school", error);
    }
}

module.exports = {
    getAllSchools,
    getSchoolById
};