<template>
    <div id="login">
        <h1>Login</h1>
        <form @submit.prevent='login()'>
            <input placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <p><a href="">Sign up</a><button type='submit'>Login</button></p>
        </form>
    </div>
</template>
<script>
    export default {
    name: 'LoginCompo',
    props: [],
    methods:{
        login(){
            console.log("hey");
        }
    }
}
</script>
<style lang='scss' scoped>
#login{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6vh;
    height: 380px;
    padding: 4vh 0;
}
h1{
    color:$NAVY;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5vh;
    width: 30%;
    input{
        border: none;
        border-radius: 3px;
        border-bottom: 2px solid $NAVY;
        width: 95%;
        padding: 2vh;
        color: $NAVY;
        font-size: 16px;

    }
    input:focus {
        outline: none;
        // border: none;
        box-shadow: 2px 2px 4px $NAVY;
    }
    ::placeholder{
        color: $NAVY;
        font-size: 16px;
    }
    button{
        padding: 1.5vh 4vh;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: $NAVY;
        color: $LIGHT_BEIGE;
        font-size: 16px;
        font-weight: 600;
    }
    button:hover{
        background-color: $DARK_BEIGE;
        color: $NAVY;
    }
    p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        a{
            color: $LIGHT_BLUE;
            text-decoration: none;
        }
        a:hover{
            color: $NAVY;
            text-decoration: underline;
        }
    }
}
</style>