import { ElementType, Suspense, lazy } from "react"
import { Navigate } from 'react-router-dom'

const Auth = (props) => {
    let role = 'admin'
    if (props.meta.role) {
        console.log(props.meta.role)
        if (!role.includes(props.meta.role)) {
            return (
                <div>没有权限</div>
            )
        }
    }
    return (
        <>{props.children}</>
    )
}

const authLoad = (element: any, meta = {}) => {
    const Component = lazy(() => import(/* @vite-ignore */element));
    return (
        <Suspense>
            <Auth meta={meta}>
                <Component></Component>
            </Auth>
        </Suspense>
    );
};
const defaultAuthLoad = (Component, meta = {}) => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Auth meta={meta}>
                {Component}
            </Auth>
        </Suspense>
    );
};

const transformRoutes = (routes) => {
    let list = [];
    routes.forEach((route) => {
        const obj = { ...route };
        // if (obj.redirect) {
        //     obj.element = <Navigate to={obj.redirect} replace={true} />;
        // }

        if (obj.element) {
            obj.element = authLoad(obj.element, obj.meta);
        }

        delete obj.redirect;
        delete obj.meta;

        if (obj.children) {
            obj.children = transformRoutes(obj.children);
        }
        list.push(obj);
    });
    return list;
};




export {
    Auth,
    authLoad,
    transformRoutes,
    defaultAuthLoad
}