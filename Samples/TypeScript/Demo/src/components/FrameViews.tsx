import React, { useEffect, useRef } from 'react';
import { LAppSprite } from '../lappsprite';
import * as LAppDefine from '../lappdefine';
import { canvas, gl } from '../lappglmanager';
import { LAppDelegate } from '../lappdelegate';

const FramesView: React.FC = () => {
  const framesRef = useRef<LAppSprite[]>([]);
  const programId = LAppDelegate.getInstance().createShader();

  useEffect(() => {
    const initializeFrames = () => {
      const width: number = canvas.width;
      const height: number = canvas.height;

      const textureManager = LAppDelegate.getInstance().getTextureManager();
      const resourcesPath = LAppDefine.ResourcesPath;

      const frameImages = LAppDefine.MiniGameImageNames;
      const frameWidth = width * 0.25;
      const frameHeight = height * 0.25;
      const positions = [
        { x: width * 0.25, y: height * 0.75 },
        { x: width * 0.75, y: height * 0.75 },
        { x: width * 0.25, y: height * 0.25 },
        { x: width * 0.75, y: height * 0.25 },
      ];

      frameImages.forEach((imageName, index) => {
        const pos = positions[index];
        textureManager.createTextureFromPngFile(
          resourcesPath + imageName,
          false,
          (textureInfo) => {
            const frame = new LAppSprite(pos.x, pos.y, frameWidth, frameHeight, textureInfo.id);
            framesRef.current.push(frame);
          }
        );
      });
    };

    initializeFrames();
  }, []);

  useEffect(() => {
    const renderFrames = () => {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      framesRef.current.forEach(frame => {
        frame.render(programId); // Assumes render method doesn't need program ID if already bound
      });

      requestAnimationFrame(renderFrames);
    };

    renderFrames();
  }, []);

  return <canvas id="frames-canvas" />;
};

export default FramesView;
