<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/sift">Tunesifter</a>
        </nav>
    <slot />
</body>

<style>
    body{
        background-color: black;
        color: white;
        margin:0%;
        /* height:100%;
        width:100%; */
        font-family: monospace;
        font-size:12pt;

        /* Mmm? background-image: url('$lib/assets/hindu_dj_dark.jpg'); */

    }
    slot{
        width:100%;
        height:100%;
    }
    nav{
        display:flex;
        border: 1px solid #a015b3;
        border-radius:10px;
        background-color: #1f0933; 
        margin:10px;
    }
    nav a{
        padding: 10px;
        background-color: #091e3b;
        border-radius: 5px;
        margin: 10px;
        margin-right:0px;
        text-decoration: none;

    }
    nav a:link {
        color:#FFF8E7;
    }
    nav a:visited{
        color:#c58dd6;
    }
    nav a:hover{
        color:#ba1645;
    }
    nav a:active{
        color:#ebb73d;
    }
    
</style>