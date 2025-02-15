// const generateCustomLink = (id) => {
//     const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`;
//     return `${BASE_URL}/api/template2/details/${id}`;  // Use path parameter format
// };

// module.exports = generateCustomLink;


const generateCustomLink = (id) => {
    const BASE_URL = process.env.BASE_URL || "https://call2connectbackend.onrender.com";
    return `${BASE_URL}/api/template2/details/${id}`;  // Use path parameter format
};

module.exports = generateCustomLink;
