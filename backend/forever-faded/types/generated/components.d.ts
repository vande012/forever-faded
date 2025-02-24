import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element.link', false>;
    footer: Schema.Attribute.String;
    galleryimages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    header: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: '';
    displayName: 'hero section';
  };
  attributes: {
    cta1: Schema.Attribute.Component<'element.link', false>;
    cta2: Schema.Attribute.Component<'element.link', false>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface BlocksHours extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hours';
  info: {
    displayName: 'Hours';
  };
  attributes: {
    hours: Schema.Attribute.Component<'shared.hours', true>;
  };
}

export interface BlocksMerchSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_merch_sections';
  info: {
    displayName: 'Merch Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element.link', false>;
    description: Schema.Attribute.Text;
    header: Schema.Attribute.String;
    merchslider: Schema.Attribute.Component<'shared.merch-slider', false>;
    subheader: Schema.Attribute.String;
  };
}

export interface BlocksReviews extends Struct.ComponentSchema {
  collectionName: 'components_blocks_reviews';
  info: {
    description: '';
    displayName: 'reviews';
  };
  attributes: {
    header: Schema.Attribute.String;
    review: Schema.Attribute.Component<'shared.review', true>;
  };
}

export interface BlocksServiceSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_sections';
  info: {
    description: '';
    displayName: 'service-section';
  };
  attributes: {
    category: Schema.Attribute.String;
    category1: Schema.Attribute.String;
    category2: Schema.Attribute.String;
    service: Schema.Attribute.Component<'shared.values', true>;
    service1: Schema.Attribute.Component<'shared.service', true>;
    service2: Schema.Attribute.Component<'shared.service', true>;
  };
}

export interface BlocksStaffSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_staff_sections';
  info: {
    displayName: 'Staff Section';
  };
  attributes: {
    staffcard: Schema.Attribute.Component<'shared.staff-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksWhyUs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_why_uses';
  info: {
    displayName: 'why-us';
  };
  attributes: {
    description: Schema.Attribute.Text;
    header: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subheader: Schema.Attribute.String;
  };
}

export interface ElementLink extends Struct.ComponentSchema {
  collectionName: 'components_element_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    text: Schema.Attribute.String;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    Label: Schema.Attribute.String;
    url: Schema.Attribute.String;
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

export interface SharedHours extends Struct.ComponentSchema {
  collectionName: 'components_shared_hours';
  info: {
    displayName: 'Hours';
    icon: 'clock';
  };
  attributes: {
    Close: Schema.Attribute.Time;
    Day: Schema.Attribute.String;
    Open: Schema.Attribute.Time;
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

export interface SharedMerchSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_merch_sliders';
  info: {
    displayName: 'Merch Slider';
  };
  attributes: {
    merchimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_links';
  info: {
    displayName: 'navigation-link';
    icon: 'code';
  };
  attributes: {
    displayName: Schema.Attribute.String;
    url: Schema.Attribute.String;
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

export interface SharedReview extends Struct.ComponentSchema {
  collectionName: 'components_shared_reviews';
  info: {
    description: '';
    displayName: 'review';
  };
  attributes: {
    body: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    stars: Schema.Attribute.Integer;
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

export interface SharedService extends Struct.ComponentSchema {
  collectionName: 'components_shared_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String;
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

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '';
    displayName: 'social-link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'X', 'Youtube', 'Yelp']
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedStaffCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_staff_cards';
  info: {
    displayName: 'staff card';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedStaffSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_staff_sections';
  info: {
    displayName: 'Staff Section';
  };
  attributes: {
    SectionTitle: Schema.Attribute.String;
  };
}

export interface SharedValues extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    description: '';
    displayName: 'values';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.gallery': BlocksGallery;
      'blocks.hero': BlocksHero;
      'blocks.hours': BlocksHours;
      'blocks.merch-section': BlocksMerchSection;
      'blocks.reviews': BlocksReviews;
      'blocks.service-section': BlocksServiceSection;
      'blocks.staff-section': BlocksStaffSection;
      'blocks.why-us': BlocksWhyUs;
      'element.link': ElementLink;
      'shared.address': SharedAddress;
      'shared.discount': SharedDiscount;
      'shared.hours': SharedHours;
      'shared.media': SharedMedia;
      'shared.merch-slider': SharedMerchSlider;
      'shared.navigation-link': SharedNavigationLink;
      'shared.quote': SharedQuote;
      'shared.review': SharedReview;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.service': SharedService;
      'shared.slider': SharedSlider;
      'shared.social-link': SharedSocialLink;
      'shared.staff-card': SharedStaffCard;
      'shared.staff-section': SharedStaffSection;
      'shared.values': SharedValues;
    }
  }
}
