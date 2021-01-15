export const addItem = (item, next) => {
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        // cart.map(c=>{
        //     if(c._id !== item._id){
        //         cart.push({...item, count: 1});
        //         localStorage.setItem('cart', JSON.stringify(cart));
        //     }
        // })
        // if(localStorage.getItem('cart')){
        //     cart = JSON.parse(localStorage.getItem('cart'));
        // }
        cart.push({...item, count: 1});
        cart = Array.from(new Set(cart.map((p)=>(p._id)))).map(id=>{
            return cart.find(p => p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const itemTotal = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

export const getCart = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const update = (productId, value) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i)=>{
            if(p._id === productId){
                cart[i].count = value;
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const remove = (productId) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i)=>{
            if(p._id === productId){
                cart.splice(i, 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

export const emptyCart = (next) => {
    console.log("HERE")
    if(typeof window !== 'undefined'){
        localStorage.removeItem('cart');
        next();
    }
}