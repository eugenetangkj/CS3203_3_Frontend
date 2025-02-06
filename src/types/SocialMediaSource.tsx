export enum SocialMediaSource {
    Reddit = 'Reddit',
  }


export const stringToSource = (input: string): SocialMediaSource | undefined => {
  return Object.values(SocialMediaSource).includes(input as SocialMediaSource) ? (input as SocialMediaSource) : undefined;
};