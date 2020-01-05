/*eslint-disable */

const db = require('../config/db.config');


export default class UserController {
  public static async getAllUsers(req, res): Promise<void> {
    console.log('DECODED***********8', req.decoded);
    try {
      const foundedUsers = await db.users.findAll({
        attributes: ['name', 'surname', 'id'],
      });
      res.status(200).json(foundedUsers);

    } catch (error) {
      res.status(400).json(error);
    }
  }

  public static getTokenInfo(req, res) {
    res.json(req.decoded);
  }


  public static async getUserInfo(req, res) {
    const uId = req.decoded.id;

    try {
      const user = await db.users.findOne({
        where: {
          id: uId,
        },
      })

      const bill = await db.bills.findOne({
        where: {
          id_owner: uId,
        },
      })

      const result = {
        user: user,
        bill: bill,
      };

      res.status(200).json(result);


    } catch (error) {
      res.status(400).json(error)
    }
  }

  public static registerUser(req, res) {
    res.status(200).json(req.data);
  };

  public static loginUser(req, res) {
    res.status(200).json(req.loginInfo);
  }

  public static async updateUser(req, res) {
    const uId = req.decoded.id;

    try {
      const user = await db.users.findOne({
        where: {
          id: uId,
        },
      })
      await user.update({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
      })

      res.status(200).json({ success: true, message: 'user updated' });

    } catch (error) {
      res.status(404).json({ success: false, message: 'user not found' });
    }
  };

}
