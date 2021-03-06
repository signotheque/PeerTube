'use strict'

module.exports = function (sequelize, DataTypes) {
  const OAuthClient = sequelize.define('OAuthClient',
    {
      clientId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      clientSecret: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grants: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      redirectUris: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    },
    {
      indexes: [
        {
          fields: [ 'clientId' ],
          unique: true
        },
        {
          fields: [ 'clientId', 'clientSecret' ],
          unique: true
        }
      ],
      classMethods: {
        countTotal,
        getByIdAndSecret,
        loadFirstClient
      }
    }
  )

  return OAuthClient
}

// ---------------------------------------------------------------------------

function countTotal (callback) {
  return this.count().asCallback(callback)
}

function loadFirstClient (callback) {
  return this.findOne().asCallback(callback)
}

function getByIdAndSecret (clientId, clientSecret) {
  const query = {
    where: {
      clientId: clientId,
      clientSecret: clientSecret
    }
  }

  return this.findOne(query)
}
