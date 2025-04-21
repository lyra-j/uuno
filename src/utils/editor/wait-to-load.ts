import Konva from 'konva';

export const waitForImagesToLoad = (stage: Konva.Stage): Promise<void> => {
  return new Promise((resolve) => {
    const images = stage.find('Image') as Konva.Image[];
    let loaded = 0;

    if (images.length === 0) return resolve();

    images.forEach((img) => {
      const konvaImage = img.image();

      if (
        konvaImage instanceof HTMLImageElement &&
        konvaImage.complete === false
      ) {
        konvaImage.onload = () => {
          loaded++;
          if (loaded === images.length) resolve();
        };
      } else {
        loaded++;
        if (loaded === images.length) resolve();
      }
    });
  });
};
