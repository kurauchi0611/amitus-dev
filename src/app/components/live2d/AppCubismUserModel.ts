
import { Live2DCubismFramework } from './dist/live2dcubismframework';
import { Live2DCubismFramework as cubismusermodel } from './dist/model/cubismusermodel';
// import CubismUserModel = cubismusermodel.CubismUserModel;
// motion
import { Live2DCubismFramework as acubismmotion } from './dist/motion/acubismmotion';
// import ACubismMotion = acubismmotion.ACubismMotion;
import { Live2DCubismFramework as cubismmotion } from './dist/motion/cubismmotion';
// import CubismMotion = cubismmotion.CubismMotion;
// import { Live2DCubismFramework as cubismmotionmanager } from './dist/motion/cubismmotionmanager';
// import CubismMotionManager = cubismmotionmanager.CubismMotionManager;

// physics
// import { Live2DCubismFramework as cubismphysics } from './dist/physics/cubismphysics';
// import CubismPhysics = cubismphysics.CubismPhysics;

// cubismid
import { Live2DCubismFramework as cubismid } from './dist/id/cubismid';
// import CubismIdHandle = cubismid.CubismIdHandle;

// effect
import { Live2DCubismFramework as cubismeyeblink } from './dist/effect/cubismeyeblink';
// import CubismEyeBlink = cubismeyeblink.CubismEyeBlink;

//type
import { Live2DCubismFramework as csmvector } from './dist/type/csmvector';
// import csmVector = csmvector.csmVector;


interface MotionResources {
    [name: string]: acubismmotion.ACubismMotion;
}

export default class AppCubismUserModel extends cubismusermodel.CubismUserModel {

    private motionResources: MotionResources;
    private lipSyncParamIds: csmvector.csmVector<cubismid.CubismIdHandle> = new csmvector.csmVector<cubismid.CubismIdHandle>();
    private eyeBlinkParamIds: csmvector.csmVector<cubismid.CubismIdHandle> = new csmvector.csmVector<cubismid.CubismIdHandle>();

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

        this.eyeBlinkParamIds
            .pushBack(id);

    }

    /**
     * モーション更新時に置き換える口パク用IDを追加
     * @param id 口パク用ID
     */
    public addLipSyncParameterId(id: cubismid.CubismIdHandle) {

        this.lipSyncParamIds
            .pushBack(id);
        
    }

    /**
     * モーションを追加して、ID（インデックス）を返す
     * @param buffer モーションデータ
     * @param name モーション名
     */
    public addMotion(buffer: ArrayBuffer, name: string, fadeIn: number = 1, fadeOut: number = 1): string {

        const motion = this.loadMotion(buffer, buffer.byteLength, name);
        
        if (fadeIn > 0) motion.setFadeInTime(fadeIn);
        if (fadeOut > 0) motion.setFadeOutTime(fadeOut);

        (motion as cubismmotion.CubismMotion).setEffectIds(this.eyeBlinkParamIds, this.lipSyncParamIds);

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

    };

    /**
     * モデルのパラメータを更新する
     */
    public update(deltaTimeSecond: number) {

        this.getModel().loadParameters();
        
        // モデルのパラメータを更新
        const motionUpdated = this._motionManager.updateMotion(this.getModel(), deltaTimeSecond);

        this.getModel().saveParameters();
        this._model.setParameterValueById(Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamAngleX"),0)
        this._model.setParameterValueById(Live2DCubismFramework.CubismFramework.getIdManager().getId("ParamAngleZ"),0)
        // まばたき
        if(!motionUpdated && this._eyeBlink != null)
        {
            this._eyeBlink.updateParameters(this._model, deltaTimeSecond);
        }

        // ポーズ
        if (this._pose !== null)
            this._pose.updateParameters(this._model, 0);
        
        // 物理演算
        if (this._physics != null)
            this._physics.evaluate(this._model, deltaTimeSecond);

        this._model.update();

    }

}