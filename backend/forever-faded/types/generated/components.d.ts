import type { Schema, Struct } from '@strapi/strapi';

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonText2: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    URL2: Schema.Attribute.String;
  };
}

export interface SharedDiscount extends Struct.ComponentSchema {
  collectionName: 'components_shared_discounts';
  info: {
    displayName: 'Discount';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonURL: Schema.Attribute.String;
    Description: Schema.Attribute.Blocks;
    PricingNote: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    herologo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    herovideo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    HeroLogo: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    HeroVideo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedServiceMenu extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_menus';
  info: {
    displayName: 'ServiceMenu';
    icon: 'book';
  };
  attributes: {};
}

export interface SharedServices extends Struct.ComponentSchema {
  collectionName: 'components_shared_services';
  info: {
    displayName: 'Services';
    icon: 'briefcase';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedStaffMembers extends Struct.ComponentSchema {
  collectionName: 'components_shared_staff_members';
  info: {
    description: '';
    displayName: 'Staff Members';
  };
  attributes: {
    staff_members: Schema.Attribute.Relation<
      'oneToMany',
      'api::staff-member.staff-member'
    >;
  };
}

export interface SharedStaffSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_staff_sections';
  info: {
    displayName: 'Staff Section';
  };
  attributes: {
    SectionTitle: Schema.Attribute.String;
    staff: Schema.Attribute.Component<'shared.staff-members', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.button': SharedButton;
      'shared.discount': SharedDiscount;
      'shared.hero': SharedHero;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.service-menu': SharedServiceMenu;
      'shared.services': SharedServices;
      'shared.slider': SharedSlider;
      'shared.staff-members': SharedStaffMembers;
      'shared.staff-section': SharedStaffSection;
    }
  }
}
