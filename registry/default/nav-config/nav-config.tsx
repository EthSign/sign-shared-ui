import { socialLinks } from './social-links';
export { socialLinks };

// ============================================================
// Footer Configuration
// ============================================================

export interface FooterNavItem {
  name: string;
  url: string;
  isNew?: boolean;
}

export interface FooterNavGroup {
  label: string;
  items: FooterNavItem[];
}

export interface FooterConfig {
  socials: { logo: string; url: string }[];
  navigation: FooterNavGroup[];
  disclaimers: string[];
  legal: {
    copyright: string;
    termsLabel: string;
    termsUrl: string;
  };
}

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  socials: [
    {
      logo: 'https://public-cdn.sign.global/Attestation-Frontend/global/social-2_250101152337.webp',
      url: socialLinks.signX
    },
    {
      logo: 'https://public-cdn.sign.global/Attestation-Frontend/global/social-5_250101152337.webp',
      url: socialLinks.telegram
    },
    {
      logo: 'https://public-cdn.sign.global/Attestation-Frontend/global/social-4_250101152337.webp',
      url: socialLinks.linkedIn
    }
  ],
  navigation: [
    {
      label: 'PRODUCTS',
      items: [
        { name: 'TokenTable', url: 'https://sign.global/tokentable' },
        { name: 'EthSign', url: 'https://app.ethsign.xyz' },
        { name: 'Sign Protocol', url: 'https://app.sign.global' },
        { name: 'SignScan', url: 'https://scan.sign.global' },
        { name: 'Orange Dynasty App', url: 'https://orange.sign.global', isNew: false },
        { name: 'Programmable Money', url: 'https://sign.global/use-cases/programmable-money' },
        { name: 'Digital ID system', url: 'https://sign.global/use-cases/digital-id-system' },
        { name: 'RWA', url: 'https://sign.global/use-cases/rwa' }
      ]
    },
    {
      label: 'LEARN',
      items: [
        { name: 'S.I.G.N. Whitepaper', url: 'https://docs.sign.global/' },
        { name: 'Open Source', url: 'https://github.com/Built-by-Sign/foundry-deployer' },
        { name: 'EthSign Docs', url: 'https://docs.ethsign.xyz/' },
        { name: 'TokenTable Docs', url: 'https://docs.tokentable.xyz/' },
        { name: 'Sign Protocol Docs', url: 'https://docs.sign.global/' },
        {
          name: 'Brand Assets',
          url: 'https://drive.google.com/drive/folders/1DCjvqTxg5YuizmpZ34cpOQ6Qo0x6Vffo?usp=sharing'
        },
        { name: 'Privacy Policy', url: 'https://sign.global/privacy_policy' },
        { name: 'SIGN MiCA Whitepaper', url: 'https://sign.global/Sign_SIGN_MiCA_Whitepaper.pdf' }
      ]
    }
  ],
  disclaimers: [
    'The information provided on this website is for general informational purposes only. It does not constitute financial, investment, legal, or professional advice. Users should consult with a qualified professional before making any decisions based on this information.',
    'Access to and use of the Sign APP, TokenTable, EthSign, and other products and services under the Sign brand may be subject to restrictions based on factors such as geographic location, age, or regulatory requirements. Our products and services are not intended for, nor available to, U.S. Persons (as defined in the Securities Act of 1933 and its regulations), including individuals residing in, organizations located in, or entities incorporated under the laws of, the United States. Additionally, our products and services are not intended for, nor available to, persons residing in other restricted territories or those with beneficial ownership in such regions or in the United States.',
    'All information on this website is provided "as is" without any warranties of any kind regarding the website and/or any content, data, materials, and/or services provided. We make no representations or warranties, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information contained on the website for any purpose.',
    'Investing in cryptocurrencies involves significant risk and can result in substantial losses. The value of digital assets is highly volatile and may be affected by external factors such as financial, regulatory, or political events. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.',
    'It is essential for users to take appropriate security precautions, including but not limited to, creating strong and unique passwords, safeguarding private keys, enabling two-factor authentication, and adhering to best practice for protecting sensitive information. We are not liable for any losses, damages, or issues resulting from user negligence, errors, or failure to implement recommended security measures.',
    'This website may contain links to third-party websites for your convenience. We do not endorse or assume any responsibility for the content, information, or services provided by these external sites. Accessing third-party links is at your own risk.',
    'All content on this website, including text, graphics, logos, and images, is the property of Sign Foundation and is protected by international copyright laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.'
  ],
  legal: {
    copyright: `© ${new Date().getFullYear()} Sign Foundation. All rights reserved.`,
    termsLabel: 'Terms & Conditions',
    termsUrl: 'https://sign.global/privacy_policy'
  }
};

