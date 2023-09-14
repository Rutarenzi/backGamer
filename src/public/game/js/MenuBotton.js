const myPopup = new Popup({
    id: "my-popup",
    title: "Menu",
   content: `
   <nav class="navbar">
        <ul>
             <li><a class="linker" href="http://localhost:5173/dashboard">Home</a></li>
             <li><a class="linker" href="http://localhost:5173/Level">Level</a></li>
             <li><a class="linker" href="http://localhost:5173/Agent">Agent</a></li>
             <li><a class="linker" href="http://localhost:5173/Team">Team</a></li>
             <li><a class="linker" href="http://localhost:5173/Account">Account</a></li>
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

