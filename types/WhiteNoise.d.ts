export interface WhiteNoiseDetail {
  id: string;
  titleName: string;
  subTitle: string;
  description: string;
  linkBackgroundImage: string;
  linkToAudios: WhiteNoiseLink[];
}

export interface WhiteNoise {
  id: string;
  titleName: string;
  subTitle: string;
  linkBackgroundImage: string;
}

export interface WhiteNoiseLink {
  id: string;
  url: string;
  fileName: string;
  whiteNoise: WhiteNoise;
}
