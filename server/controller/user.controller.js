const userData = {
    fullName: 'Don Joe',
    address: 'some place',
    email: 'joe@don.email',
    token: '123don456joe',
    password: 'test123'
}

const userLogin = (req, res) => {
    if(req.body.email=== userData.email && req.body.password===userData.password) {
        req.session.sid=userData.token;    
        return res.status(200).send({
            success: true,
            message: 'user Logged in successfully!!'
        })
    } else {
        return res.status(500).send({
            error:true,
            message: "username and password didnt match!!"            
        });
    }
}

const getUserData = (req, res) => {    
    if(req.session && req.session.sid) {
        return res.status(200).send({
            success:true,
            userData: {
                fullName: userData.fullName,
                address: userData.address,
                email: userData.email
            }
        });
    } else {
        return res.status(500).send({
            error: true,
            message: 'user not logged in'
        });
    }
}

const userLogout = (req, res) => {
    req.session.sid = undefined;
    return res.status(200).send({
        success:true,
        message: "user logged out"
    });
}

const userSignup = (req, res) => {
    return res.send({
        success:true,
        message: "user created"
    });
}

module.exports = {
    userLogin, userLogout, userSignup, getUserData
}