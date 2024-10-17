const { z } = require('zod');

const createHikingPlaceSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    image: z.string({
        required_error: "Image is required",
    }),
    duration: z.string().optional(), // Cambiado a optional ya que puede ser null
    difficulty: z.enum(['Facil', 'Moderado', 'Dificil', 'Muy Dificil'], {
        required_error: "Difficulty is required",
    }),
    lat: z
    .coerce
    .number({
        required_error: "Latitude is required",
    }),
    lng: z
    .coerce
    .number({
        required_error: "Longitude is required",
    }),
    flag: z.string().optional(), // Cambiado a optional ya que puede ser null
    country: z.string({
        required_error: "Country is required",
    }),
    continent: z.string({
        required_error: "Continent is required",
    }),
});

module.exports = {
    createHikingPlaceSchema,
};
