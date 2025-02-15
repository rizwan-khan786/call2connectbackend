const generateCustomLink = (id) => {
    const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`;
    return `${BASE_URL}/api/template2/details/${id}`;  // Use path parameter format
};

module.exports = generateCustomLink;
