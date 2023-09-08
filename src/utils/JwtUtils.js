import Jwt from "jsonwebtoken";

class Jwtutils {
    static generator(data,options) {
        const token = Jwt.sign({ data }, process.env.JWT_SECRET,options)
        return token;
    }

    static verify(token){
      const data = Jwt.verify(token, process.env.JWT_SECRET);
      return data;
    }
}

export default Jwtutils;