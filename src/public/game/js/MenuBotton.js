const myPopup = new Popup({
    id: "my-popup",
    title: "Menu",
   content: `
   <nav class="navbar">
        <ul>
             <li><a class="linker" href="https://front-csn.vercel.app/dashboard">Home</a></li>
             <li><a class="linker" href="https://front-csn.vercel.app/Level">Level</a></li>
             <li><a class="linker" href="https://front-csn.vercel.app/Agent">Agent</a></li>
             <li><a class="linker" href="https://front-csn.vercel.app/Team">Team</a></li>
             <li><a class="linker" href="https://front-csn.vercel.app/Account">Account</a></li>
          </ul>
   </nav>
          `,
    css:  `
    .popup-content{
      background-color: #1a2c38 !important;
      width: 20vw
    }
    .linker{
      color:#00b801 !important;
    }
    .linker:hover{
      color:#1fff20 !important;
    }
    .popup-close{
      color: white !important;
    }
    .popup-title{
      color:#00e701 !important;
    }
    `,
        
       });

