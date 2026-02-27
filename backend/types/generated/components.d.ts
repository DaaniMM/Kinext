import type { Schema, Struct } from '@strapi/strapi';

export interface HomeBeneficio extends Struct.ComponentSchema {
  collectionName: 'components_home_beneficios';
  info: {
    displayName: 'Beneficio';
  };
  attributes: {
    descripcion: Schema.Attribute.String;
    icono: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
  };
}

export interface HomeEstadistica extends Struct.ComponentSchema {
  collectionName: 'components_home_estadisticas';
  info: {
    displayName: 'Estadistica';
  };
  attributes: {
    label: Schema.Attribute.String;
    numero: Schema.Attribute.String;
  };
}

export interface HomePaso extends Struct.ComponentSchema {
  collectionName: 'components_home_pasos';
  info: {
    displayName: 'Paso';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    icono: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
  };
}

export interface PlanCaracteristicaPlan extends Struct.ComponentSchema {
  collectionName: 'components_plan_caracteristica_plans';
  info: {
    displayName: 'CaracteristicaPlan';
  };
  attributes: {
    incluido: Schema.Attribute.Boolean;
    texto: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.beneficio': HomeBeneficio;
      'home.estadistica': HomeEstadistica;
      'home.paso': HomePaso;
      'plan.caracteristica-plan': PlanCaracteristicaPlan;
    }
  }
}
