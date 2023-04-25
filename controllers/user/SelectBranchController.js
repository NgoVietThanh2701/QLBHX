
export const createBranchUser = async (req, res) => {
    req.session.port_user = req.body.port_user;
    res.status(200).json({msg: "select port successfully!"});
}

export const getBranchUser = async(req, res) => {
    const port = req.session.port_user
    res.status(200).json({port});
}