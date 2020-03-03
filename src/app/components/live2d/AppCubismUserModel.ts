import { Live2DCubismFramework } from "./dist/live2dcubismframework";
import { Live2DCubismFramework as cubismusermodel } from "./dist/model/cubismusermodel";
// import CubismUserModel = cubismusermodel.CubismUserModel;
// motion
import { Live2DCubismFramework as acubismmotion } from "./dist/motion/acubismmotion";
// import ACubismMotion = acubismmotion.ACubismMotion;
import { Live2DCubismFramework as cubismmotion } from "./dist/motion/cubismmotion";
// import CubismMotion = cubismmotion.CubismMotion;
// import { Live2DCubismFramework as cubismmotionmanager } from './dist/motion/cubismmotionmanager';
// import CubismMotionManager = cubismmotionmanager.CubismMotionManager;

// physics
// import { Live2DCubismFramework as cubismphysics } from './dist/physics/cubismphysics';
// import CubismPhysics = cubismphysics.CubismPhysics;

// cubismid
import { Live2DCubismFramework as cubismid } from "./dist/id/cubismid";
// import CubismIdHandle = cubismid.CubismIdHandle;

// effect
import { Live2DCubismFramework as cubismeyeblink } from "./dist/effect/cubismeyeblink";
// import CubismEyeBlink = cubismeyeblink.CubismEyeBlink;

//type
import { Live2DCubismFramework as csmvector } from "./dist/type/csmvector";
// import csmVector = csmvector.csmVector;

interface MotionResources {
  [name: string]: acubismmotion.ACubismMotion;
}

export default class AppCubismUserModel extends cubismusermodel.CubismUserModel {
  private motionResources: MotionResources;
  private lipSyncParamIds: csmvector.csmVector<
    cubismid.CubismIdHandle
  > = new csmvector.csmVector<cubismid.CubismIdHandle>();
  private eyeBlinkParamIds: csmvector.csmVector<
    cubismid.CubismIdHandle
  > = new csmvector.csmVector<cubismid.CubismIdHandle>();

  constructor() {
    super();

    this.motionResources = {};
    this.lipSyncParamIds = new csmvector.csmVector<cubismid.CubismIdHandle>();
    this.eyeBlinkParamIds = new csmvector.csmVector<cubismid.CubismIdHandle>();
  }

  /**
   * 自動目ぱちを設定
   * @param eyeBlink
   */
  public setEyeBlink(eyeBlink: cubismeyeblink.CubismEyeBlink) {
    this._eyeBlink = eyeBlink;
  }

  /**
   * モーション更新時に置き換える目ぱち用IDを追加
   * @param id 目ぱち用ID
   */
  public addEyeBlinkParameterId(id: cubismid.CubismIdHandle) {
    this.eyeBlinkParamIds.pushBack(id);
  }

  /**
   * モーション更新時に置き換える口パク用IDを追加
   * @param id 口パク用ID
   */
  public addLipSyncParameterId(id: cubismid.CubismIdHandle) {
    this.lipSyncParamIds.pushBack(id);
  }

  /**
   * モーションを追加して、ID（インデックス）を返す
   * @param buffer モーションデータ
   * @param name モーション名
   */
  public addMotion(
    buffer: ArrayBuffer,
    name: string,
    fadeIn: number = 1,
    fadeOut: number = 1
  ): string {
    const motion = this.loadMotion(buffer, buffer.byteLength, name);

    if (fadeIn > 0) motion.setFadeInTime(fadeIn);
    if (fadeOut > 0) motion.setFadeOutTime(fadeOut);

    (motion as cubismmotion.CubismMotion).setEffectIds(
      this.eyeBlinkParamIds,
      this.lipSyncParamIds
    );

    this.motionResources[name] = motion;

    return name;
  }

  /**
   * 登録されているモーションのIDと名前のリストを返す
   */
  public get motionNames(): string[] {
    return Object.keys(this.motionResources);
  }

  /**
   * モーションの再生が終わっているかどうか
   */
  public get isMotionFinished(): boolean {
    return this._motionManager.isFinished();
  }

  /**
   * モーションの名前を指定して再生する
   * @param name モーション名
   */
  public startMotionByName(name: string) {
    const motion = this.motionResources[name];

    if (!motion) return;

    this._motionManager.startMotionPriority(motion, false, 0);
  }

  /**
   * モデルのパラメータを更新する
   */
  public update(deltaTimeSecond: number, pos: any) {
    if (false) console.log(pos);
    if (pos === null) return false;

    this.getModel().loadParameters();
    // モデルのパラメータを更新
    const motionUpdated = this._motionManager.updateMotion(
      this.getModel(),
      deltaTimeSecond
    );

    this.getModel().saveParameters();
    var faceL = pos[62][0] - pos[2][0];
    var faceR = pos[12][0] - pos[62][0];
    var vecL = [pos[2][0] - pos[7][0], pos[2][1] - pos[7][1]];
    var vecR = [pos[12][0] - pos[7][0], pos[12][1] - pos[7][1]];
    var lipH = pos[53][1] - pos[57][1];
    var eyeHL = pos[26][1] - pos[24][1];
    // var eyeHR = pos[31][1] - pos[29][1];
    // 3以降のモデル用
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamAngleX"),
      (90 * (faceL - faceR)) / (faceL + faceR)
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamAngleZ"),
      (-90 * (pos[33][0] - pos[62][0])) / (pos[33][1] - pos[62][1])
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamAngleY"),
      (-90 * (vecL[0] * vecR[0] + vecL[1] * vecR[1])) /
        Math.sqrt(vecL[0] * vecL[0] + vecL[1] * vecL[1]) /
        Math.sqrt(vecR[0] * vecR[0] + vecR[1] * vecR[1])
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamMouthOpenY"
      ),
      (pos[57][1] - pos[60][1]) / lipH - 0.2
    );

    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamMouthForm"
      ),
      (2 * (pos[50][0] - pos[44][0])) / (pos[30][0] - pos[25][0]) - 1
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamEyeBallX"
      ),
      (pos[27][0] - pos[23][0]) / (pos[25][0] - pos[23][0]) - 0.5
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamEyeBallY"
      ),
      (pos[27][1] - pos[24][1]) / eyeHL - 0.5
    );
    // this._model.setParameterValueById(
    //   Live2DCubismFramework.CubismFramework.getIdManager().getId(
    //     "ParamEyeLOpen"
    //   ),
    //   (0.7 * eyeHL) / lipH
    // );
    // this._model.setParameterValueById(
    //   Live2DCubismFramework.CubismFramework.getIdManager().getId(
    //     "ParamEyeROpen"
    //   ),
    //   (0.7 * eyeHR) / lipH
    // );

    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamBlowLY"),
      (2 * (pos[24][1] - pos[21][1])) / lipH - 4
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamBlowRY"),
      (2 * (pos[29][1] - pos[17][1])) / lipH - 4
    );

    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamBodyAngleX"
      ),
      (90 * (faceL - faceR)) / (faceL + faceR) / 3
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamBodyAngleZ"
      ),
      (-90 * (pos[33][0] - pos[62][0])) / (pos[33][1] - pos[62][1]) / 3
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "ParamBodyAngleY"
      ),
      (-90 * (vecL[0] * vecR[0] + vecL[1] * vecR[1])) /
        Math.sqrt(vecL[0] * vecL[0] + vecL[1] * vecL[1]) /
        Math.sqrt(vecR[0] * vecR[0] + vecR[1] * vecR[1]) /
        3
    );

    // 2以前
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("PARAM_ANGLE_X"),
      (90 * (faceL - faceR)) / (faceL + faceR)
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("PARAM_ANGLE_Z"),
      (-90 * (pos[33][0] - pos[62][0])) / (pos[33][1] - pos[62][1])
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("PARAM_ANGLE_Y"),
      (-90 * (vecL[0] * vecR[0] + vecL[1] * vecR[1])) /
        Math.sqrt(vecL[0] * vecL[0] + vecL[1] * vecL[1]) /
        Math.sqrt(vecR[0] * vecR[0] + vecR[1] * vecR[1])
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_MOUTH_OPEN_Y"
      ),
      (pos[57][1] - pos[60][1]) / lipH - 0.2
    );

    // this._model.setParameterValueById(
    //   Live2DCubismFramework.CubismFramework.getIdManager().getId(
    //     "PARAM_MOUTH_FORM"
    //   ),
    //   (2 * (pos[50][0] - pos[44][0])) / (pos[30][0] - pos[25][0]) - 1
    // );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_EYE_BALL_X"
      ),
      (pos[27][0] - pos[23][0]) / (pos[25][0] - pos[23][0]) - 0.5
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_EYE_BALL_Y"
      ),
      (pos[27][1] - pos[24][1]) / eyeHL - 0.5
    );
    // this._model.setParameterValueById(
    //   Live2DCubismFramework.CubismFramework.getIdManager().getId(
    //     "PARAM_EYE_L_OPEN"
    //   ),
    //   (0.7 * eyeHL) / lipH
    // );
    // this._model.setParameterValueById(
    //   Live2DCubismFramework.CubismFramework.getIdManager().getId(
    //     "PARAM_EYE_R_OPEN"
    //   ),
    //   (0.7 * eyeHR) / lipH
    // );

    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamBlowLY"),
      (2 * (pos[24][1] - pos[21][1])) / lipH - 4
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamBlowRY"),
      (2 * (pos[29][1] - pos[17][1])) / lipH - 4
    );

    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_BODY_ANGLE_X"
      ),
      (90 * (faceL - faceR)) / (faceL + faceR) / 3
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_BODY_ANGLE_Z"
      ),
      (-90 * (pos[33][0] - pos[62][0])) / (pos[33][1] - pos[62][1]) / 3
    );
    this._model.setParameterValueById(
      Live2DCubismFramework.CubismFramework.getIdManager().getId(
        "PARAM_BODY_ANGLE_Y"
      ),
      (-90 * (vecL[0] * vecR[0] + vecL[1] * vecR[1])) /
        Math.sqrt(vecL[0] * vecL[0] + vecL[1] * vecL[1]) /
        Math.sqrt(vecR[0] * vecR[0] + vecR[1] * vecR[1]) /
        3
    );
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartArmA"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartWatchB"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartArmAL"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartArmAR"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartArmBR"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("PartArmDL"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("Part01ArmRA001"), 0);
    this._model.setPartOpacityById(Live2DCubismFramework.CubismFramework.getIdManager().getId("Part01ArmLA001"), 0);

    // まばたき
    if (!motionUpdated && this._eyeBlink != null) {
      this._eyeBlink.updateParameters(this._model, deltaTimeSecond);
    }

    // ポーズ
    // if (this._pose !== null) this._pose.updateParameters(this._model, 0);

    // 物理演算
    if (this._physics != null)
      this._physics.evaluate(this._model, deltaTimeSecond);

    this._model.update();
  }
}
