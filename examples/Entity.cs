using System;
using System.Collections.Generic;
using System.Linq;

public class Entity{

    private Dictionary<Type, ECS_Component> mComponents;
    public List<Group> mGroups;

    public Entity(){
        mComponents = new Dictionary<Type, ECS_Component>();
        mGroups = new List<Group>();
    }

    public void AddGroup(Group theGroup){
        mGroups.Add(theGroup);
    }

    public bool HasComponent(Type t) {
        return mComponents.ContainsKey(t);
    }

    public T AddComponent<T>() where T : ECS_Component, new(){
        T c = Pool.pool.AddComponent<T>();
        c.entity = this;
        mComponents.Add(typeof(T), c);
        return c;
    }

    public T AccessComponent<T>() where T : ECS_Component{
        ECS_Component component;
        this.mComponents.TryGetValue(typeof(T), out component);
        return component as T;

    }

    public void RemoveComponent<T>() where T : ECS_Component {
        ECS_Component component;
        this.mComponents.TryGetValue(typeof(T), out component);
        if(component != null){
            this.mComponents.Remove(typeof(T));
            Pool.pool.RemoveComponent(typeof(T), component);
        }
    }

    public void Delete(){
        for (int i = 0; i < mGroups.Count;i++){
            mGroups[i].Remove(this);   
        }
        foreach(var pair in mComponents.ToArray()){
            Pool.pool.RemoveComponent(pair.Key, pair.Value);
        }
        mComponents.Clear();
        mGroups.Clear();
        Pool.pool.ReleaseEntity(this);
    }

}