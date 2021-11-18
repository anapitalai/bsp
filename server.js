// Requirements
const mongoose = require("mongoose");
const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
const bcrypt = require("bcryptjs");
const User = require("./models/User.model");
const Days = require('./hooks/days')

const Claim = require("./models/Claim.model");
const SystemID=require("./models/SystemID.model");
const ClaimID=require("./models/ClaimID.model");
const CIF = require("./models/CIF.model");
const Claimant = require("./models/Claimant.model");
const Deceased = require("./models/Deceased.model");

const DeathCause = require("./models/Cause_of_death.model");

const Branch = require("./models/Branch.model");

require("dotenv").config();

const adminNavigation = {
  name: "Admin",
  icon: "Restriction",
};
const restrictedNavigation = {
  name: "Restricted",
  icon: "Accessibility",
};
//
// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require("@admin-bro/mongoose"));

// express server definition
const app = express();

// RBAC functions
const canEditRecords = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin._id === record.param("ownerId"))
  );

};

const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";


// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  branding: {
    companyName: "PNGBSP Claims",
    logo: "https://www.bsp.com.pg/content/images/bsp-logo.jpg",
  },
  theme: {
    color: {
      primary: "red",
      bck: "maroon",
    },
  },
  resources: [
    {
      resource: Claim,
      options: {
        navigation: restrictedNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          total_claim: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          days_delay_notification: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          comments: { type: "richtext" },

          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          updatedAt: {
            isVisible: { edit: true, show: false, list: false, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditRecords },
          delete: { isAccessible: canEditRecords },
            
            //claim new aaction
            new: {
              isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
              before: async (request) => {
                if (request.method == "post") {
                  const { date_of_death, date_of_notification,loan_balance,funeral_benefit, ...otherParams } = request.payload;
                  if (date_of_death && date_of_notification) {
                    const days_delay_notification = Days.number_of_days(date_of_death,date_of_notification)
                    const total_claim = Days.total_claim(loan_balance,funeral_benefit)
                    
                    return {
                      ...request,
                      payload: {
                        ...otherParams,
                      days_delay_notification,
                      total_claim
                      },
                    };
                  }
                }
  
                return request;
              },
            },

            //added by SLY
          // new: {
          //   before: async (request, { currentAdmin }) => {
          //     request.payload = {
          //       ...request.payload,
          //       ownerId: currentAdmin._id,
          //     };
          //     return request;
          //   },
          // },            //end new
        },
      },
     
        },
    //branch
    {
      resource: Branch,

      options: {
        navigation: adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {  SystemId: { type: String, required: true, unique: false },

          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
    //payment
    {
      resource: CIF,
      options: {
        navigation: adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
        //payment
        {
          resource: SystemID,
          options: {
            navigation: adminNavigation,
            properties: {
              ownerId: {
                isVisible: { edit: false, show: true, list: true, filter: true },
              },
            },
    
            actions: {
              edit: { isAccessible: canModifyUsers },
              delete: { isAccessible: canModifyUsers },
              new: { isAccessible: canModifyUsers },
              bulkDelete: { isAccessible: canModifyUsers },
            },
          },
        },
            //payment
    {
      resource: ClaimID,
      options: {
        navigation: adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
  //deceased
  {
  resource: Deceased,
  options: {
    navigation: adminNavigation,
    properties: {
      ownerId: {
        isVisible: { edit: false, show: true, list: true, filter: true },
      },
    },

    actions: {
      edit: { isAccessible: canModifyUsers },
      delete: { isAccessible: canModifyUsers },
      new: { isAccessible: canModifyUsers },
      bulkDelete: { isAccessible: canModifyUsers },
    },
  },
},
   

  
    //claimant
    {
      resource: DeathCause,

      options: {
        navigation: adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },


  
    //claimant
    {
      resource: Claimant,

      options: {
        navigation: adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },


    
    //Users
    {
      resource: User,

      options: {
        navigation: adminNavigation,
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {isAccessible:canModifyUsers,
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            }
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          //new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
  rootPath: "/admin",
});

// Build and use a router which will handle all AdminBro routes buildAuthenticatedRouter
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});



app.use(adminBro.options.rootPath, router);
//
// Running the server
const run = async () => {


    await mongoose.connect(
      "mongodb+srv://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@" +
        process.env.DB_HOST +
        "/" +
        process.env.DB_LOCAL+"?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );

  await app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`)
  );
};

run();
