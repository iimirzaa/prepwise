import Token from "../schemas/refreshtokenschema.js";
const   tokenRepository={
    create:(data)=>Token.create(data),
    findOne: (filter) => Token.findOne(filter),
    
    
};
export default tokenRepository;