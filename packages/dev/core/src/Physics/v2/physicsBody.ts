import type { IPhysicsEnginePluginV2, MassProperties } from "./IPhysicsEnginePlugin";
import type { PhysicsShape } from "./physicsShape";
import type { Vector3 } from "../../Maths/math.vector";
import { Quaternion } from "../../Maths/math.vector";
import type { Scene } from "../../scene";
import type { PhysicsEngine } from "./physicsEngine";
import type { Mesh, TransformNode } from "../../Meshes";

/**
 *
 */
/** @internal */
export class PhysicsBody {
    /** @internal */
    public _pluginData: any = undefined;
    /**
     *
     */
    public _pluginDataInstances: Array<any> = [];
    private _physicsPlugin: IPhysicsEnginePluginV2;
    /**
     *
     */
    node: TransformNode;
    /**
     *
     * @param scene
     * @returns
     */
    constructor(node: TransformNode, scene: Scene) {
        if (!scene) {
            return;
        }
        const physicsEngine = scene.getPhysicsEngine() as PhysicsEngine;
        if (!physicsEngine) {
            throw new Error("No Physics Engine available.");
        }
        if (physicsEngine.getPluginVersion() != 2) {
            throw new Error("Plugin version is incorrect. Expected version 2.");
        }
        const physicsPlugin = physicsEngine.getPhysicsPlugin();
        if (!physicsPlugin) {
            throw new Error("No Physics Plugin available.");
        }

        this._physicsPlugin = physicsPlugin as IPhysicsEnginePluginV2;
        if (!node.rotationQuaternion) {
            node.rotationQuaternion = Quaternion.FromEulerAngles(node.rotation.x, node.rotation.y, node.rotation.z);
        }
        // instances?
        const m = node as Mesh;
        if (m.hasThinInstances) {
            this._physicsPlugin.initBodyInstances(this, m);
        } else {
            // single instance
            this._physicsPlugin.initBody(this, node.position, node.rotationQuaternion);
        }
        this.node = node;
        physicsEngine.addBody(this);
    }
    /**
     *
     * @param shape
     */
    public setShape(shape: PhysicsShape): void {
        this._physicsPlugin.setShape(this, shape);
    }

    /**
     *
     * @returns
     */
    public getShape(): PhysicsShape | undefined {
        return this._physicsPlugin.getShape(this);
    }

    /**
     *
     * @param group
     */
    public setFilterGroup(group: number): void {
        this._physicsPlugin.setFilterGroup(this, group);
    }

    /**
     *
     * @returns
     */
    public getFilterGroup(): number {
        return this._physicsPlugin.getFilterGroup(this);
    }

    /**
     *
     * @param eventMask
     */
    public setEventMask(eventMask: number): void {
        this._physicsPlugin.setEventMask(this, eventMask);
    }

    /**
     *
     * @returns
     */
    public getEventMask(): number {
        return this._physicsPlugin.getEventMask(this);
    }

    /**
     *
     * @param massProps
     */
    public setMassProperties(massProps: MassProperties): void {
        this._physicsPlugin.setMassProperties(this, massProps);
    }

    /**
     *
     * @returns
     */
    public getMassProperties(): MassProperties | undefined {
        return this._physicsPlugin.getMassProperties(this);
    }

    /**
     *
     * @param damping
     */
    public setLinearDamping(damping: number): void {
        this._physicsPlugin.setLinearDamping(this, damping);
    }

    /**
     *
     * @returns
     */
    public getLinearDamping(): number {
        return this._physicsPlugin.getLinearDamping(this);
    }

    /**
     *
     * @param damping
     */
    public setAngularDamping(damping: number): void {
        this._physicsPlugin.setAngularDamping(this, damping);
    }

    /**
     *
     * @returns
     */
    public getAngularDamping(): number {
        return this._physicsPlugin.getAngularDamping(this);
    }

    /**
     *
     * @param linVel
     */
    public setLinearVelocity(linVel: Vector3): void {
        this._physicsPlugin.setLinearVelocity(this, linVel);
    }

    /**
     *
     * @returns
     */
    public getLinearVelocityToRef(linVel: Vector3): void {
        return this._physicsPlugin.getLinearVelocityToRef(this, linVel);
    }

    /**
     *
     * @param angVel
     */
    public setAngularVelocity(angVel: Vector3): void {
        this._physicsPlugin.setAngularVelocity(this, angVel);
    }

    /**
     *
     * @returns
     */
    public getAngularVelocityToRef(angVel: Vector3): void {
        return this._physicsPlugin.getAngularVelocityToRef(this, angVel);
    }

    /**
     *
     * @param location
     * @param impulse
     */
    public applyImpulse(location: Vector3, impulse: Vector3): void {
        this._physicsPlugin.applyImpulse(this, location, impulse);
    }

    public getGeometry(): {} {
        return this._physicsPlugin.getBodyGeometry(this);
    }

    /**
     *
     */
    public dispose() {
        this._physicsPlugin.disposeBody(this);
    }
}
