export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description?: string | null;
  links: {
    html: string;
  };
  user: {
    name: string;
  };
  height: number;
  width: number;
}
