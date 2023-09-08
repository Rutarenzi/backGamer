import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

class BcryptUtils {
    static hash(password){
        const pswdSalt = genSaltSync(10,"store");
        const pswdHashed = hashSync(password, pswdSalt);
        return pswdHashed;
    }
    static compare(password1,password2){
        const validPswd = compareSync(password1,password2);
        return validPswd;
    }
}

export default BcryptUtils;