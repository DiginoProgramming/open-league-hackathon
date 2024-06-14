/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from "@framework/live2dcubismframework";

/**
 * Constants used in the Sample App
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | "auto" = "auto";

// Screen settings
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// Relative path
export const ResourcesPath = "../../Resources/";

// Background image file behind the model
// export const BackImageName = "back_class_normal.png";
export const BackImageName = "back_room02.png";

// Gear icon
export const GearImageName = "icon_gear.png";

// Exit button
export const PowerImageName = "CloseNormal.png";

// Mini-games icon
export const MiniGameImageNames = [
  "minigame_icon_image_2048.png",
  "minigame_icon_image_color.png",
  "minigame_icon_image_2048.png",
  "minigame_icon_image_color.png",
]

// Model definitions---------------------------------------------
// Array of directory names where models are placed
// The directory name and model3.json name should match
export const ModelDir: string[] = [
  "Haru",
  "Hiyori",
  "Mark",
  "Natori",
  "Rice",
  "Mao",
  "Wanko",
  "Sparkle",
  "generic_boy_01",
  "Design_genius(1)",
];
export const ModelDirSize: number = ModelDir.length;

// Match with external definition files (json)
export const MotionGroupIdle = "Idle"; // Idling
export const MotionGroupTapBody = "TapBody"; // When the body is tapped

// Match with external definition files (json)
export const HitAreaNameHead = "Head";
export const HitAreaNameBody = "Body";

// Priority constants for motion
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// MOC3 consistency validation option
export const MOCConsistencyValidationEnable = true;

// Debug log display options
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Log level settings for output from the Framework
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// Default render target size
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
