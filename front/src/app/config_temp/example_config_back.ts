export const ExampleLayoutBack = [
    {
        "id": 3,
        "form_template_id": 1,
        "key": "title_3",
        "label": "REGISTRO PROVEEDORES NACIONALES",
        "field_type": "heading",
        "required": false,
        "order_index": 1,
        settings: {
            classes: 'mb-0 font-semibold col-12 pl-1'
        }
    },
    {
        "id": 4,
        "form_template_id": 1,
        "key": "paragraph_1",
        "label": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident.\nSunt in culpa qui officia deserunt mollit anim id est laborum.\nCurabitur pretium tincidunt lacus.\nNulla gravida orci a odio.",
        "field_type": "paragraph",
        "required": false,
        "order_index": 2
    },
    {
        "id": 5,
        "form_template_id": 1,
        "key": "section_datos_proveedor",
        "label": "Datos Proveedor",
        "field_type": "section",
        "required": false,
        "order_index": 3,
        "children": [
            {
                "id": 6,
                "form_template_id": 1,
                "parent_field_id": 5,
                "key": "tipo_persona",
                "label": "TIPO DE PERSONA",
                "field_type": "select",
                "required": true,
                "order_index": 1,
                "options": {
                    "items": [
                        {
                            "label": "Persona jurídica",
                            "value": "persona_juridica"
                        },
                        {
                            "label": "Persona natural",
                            "value": "persona_natural"
                        }
                    ]
                }
            },
            {
                "id": 7,
                "form_template_id": 1,
                "parent_field_id": 5,
                "key": "tipo_documento",
                "label": "TIPO DE DOCUMENTO",
                "field_type": "select",
                "required": true,
                "order_index": 2,
                "options": {
                    "items": [
                        {
                            "label": "NIT",
                            "value": "nit",
                            "visible_if": {
                                "op": "==",
                                "value": "persona_juridica",
                                "field_key": "tipo_persona"
                            }
                        },
                        {
                            "label": "Cédula de ciudadanía (CC)",
                            "value": "cc",
                            "visible_if": {
                                "op": "==",
                                "value": "persona_natural",
                                "field_key": "tipo_persona"
                            }
                        },
                        {
                            "label": "Cédula de extranjería (CE)",
                            "value": "ce",
                            "visible_if": {
                                "op": "==",
                                "value": "persona_natural",
                                "field_key": "tipo_persona"
                            }
                        },
                        {
                            "label": "Tarjeta de identidad (TI)",
                            "value": "ti",
                            "visible_if": {
                                "op": "==",
                                "value": "persona_natural",
                                "field_key": "tipo_persona"
                            }
                        },
                        {
                            "label": "Pasaporte",
                            "value": "passport",
                            "visible_if": {
                                "op": "==",
                                "value": "persona_natural",
                                "field_key": "tipo_persona"
                            }
                        },
                        {
                            "label": "Otro",
                            "value": "otro"
                        }
                    ]
                }
            },
            {
                "id": 8,
                "form_template_id": 1,
                "parent_field_id": 5,
                "key": "numero_documento",
                "label": "NÚMERO DE DOCUMENTO",
                "field_type": "number",
                "required": true,
                "order_index": 3,
                "validations": {
                    "pattern": "",
                    "maxlength": 15,
                    "minlength": 6,
                }
            },
            {
                "id": 9,
                "form_template_id": 1,
                "parent_field_id": 5,
                "key": "nombre_razon_social",
                "label": "NOMBRE O RAZÓN SOCIAL",
                "placeholder": 'TESTING...',
                "field_type": "text",
                "required": true,
                "order_index": 4,
                "validations": {
                    "maxlength": 255,
                    "minlength": 3
                }
            },
            // {
            //     "id": 10,
            //     "form_template_id": 1,
            //     "parent_field_id": 5,
            //     "key": "mail_proveedor",
            //     "label": "CORREO ELECTRÓNICO",
            //     "field_type": "email",
            //     "required": true,
            //     "order_index": 5,
            //     "validations": {
            //         "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
            //         "maxlength": 255
            //     }
            // },
            {
                "id": 11,
                "form_template_id": 1,
                "parent_field_id": 5,
                "key": "telefono",
                "label": "TELÉFONO",
                "field_type": "phone",
                "required": true,
                "order_index": 6,
                "validations": {
                    "maxlength": 15,
                    "minlength": 7
                },
                "settings": {
                    "default": "CO",
                    "supported_countries": [
                        "CO",
                        "US",
                        "MX",
                        "BR",
                        "AR"
                    ]
                }
            }
        ]
    }
]