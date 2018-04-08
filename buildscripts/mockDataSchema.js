export const schema = {
  "type": "object",
  "required": ["users", "device"],
  "properties": {
    "device": {
      "type": "array",
      "minItems": 10,
      "maxItems": 10,
      "items": {
        "type": "object",
        "required": ["id", "name", "controls"],
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1,
            "maximum": 10
          },
          "name": {
            "type": "string",
            "faker": "commerce.product"
          },
          "controls": {
            "type": "array",
            "minItems": 5,
            "maxItems": 20,
            "items": {
              "type": "object",
              "required": ["name", "controlType", "enabled", "value"],
              "properties": {
                "name": {
                  "type": "string",
                  "faker": "hacker.verb"
                },
                "controlType": {
                  "type": "string",
                  "enum": ["toggle", "string", "int"]
                },
                "enabled": {
                  "type": "boolean"
                },
                "value": {
                  "type": "number",
                  "enum": [0, 1]
                }
              }
            }
          },
        }
      },
    },
    "users": {
      "type": "array",
      "minItems": 20,
      "maxItems": 50,
      "items": {
        "type": "object",
        "required": ["id", "firstName", "lastName", "email"],
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
        }
      }
    }
  }
};

/*
export const schema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 20,
      "maxItems": 50,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
        },
        "required": ["id", "firstName", "lastName", "email"]
      }
    }
  },
  "required": ["users"]
};
*/