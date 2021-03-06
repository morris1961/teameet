- Demo 影片連結：
    https://www.youtube.com/watch?v=4UV5XFBcNO4

- 這個服務在做什麼：
    TEAMEET 致力於提供統一管理工作群組和討論的線上平台服務，並且制定方便成員訂定討論時間及地點的機制，同時具備傳統聊天軟體的訊息功能。有以下三大主要功能：
    - 個人用戶：使用者可以透過註冊將帳戶相關資料儲存在資料庫裡，登入後便會以註冊之身分在線上與其他使用者互動。
    - 群組：任何個人用戶皆可以創建群組，提供聊天室使組員可以進行溝通討論，除此之外組內任一成員也可以發起討論，發起討論時需先決定該次討論之主題、時間範圍、區間，以及在候選地點等等。
    - 討論：當討論被建立後，再投票截止日期前，該群組的成員可進入該討論進行投票，決定自己希望的討論時間以及討論地點為何，其中時間會依照創建時的範圍和間隔做切分，地點的部分則是在投票過程中可以由任一位使用者新增選項。發起討論之用戶會被設定為該討論之創建者，必須在投票結束後從最高票的選項中進行最終確認，避免同樣票數的情況。

- 使用之第三方套件、框架、程式碼：
    - 前端：React.js, React Router
    - 後端：Node.js, express, Websocket
    - 資料庫：Mongoose
    - 第三方套件：ant-design, AOS, moment

- 如何在 localhost 安裝與測試之詳細步驟：
    1. git clone
    2. node 以及 npm 版本可以參考 package.json 裡面的 engines。
    3. 先分別執行 cd frontend && npm install 以及 cd backend && npm install
    4. 在 backend 底下新增 .env，以下簡單說明，也可以參考 .env.default
        1. MONGO_URL=${你的 mongodb 的 url}
    5. 安裝完畢後 npm start 可以開啟前端，npm run server 可以開啟後端
    6. 我們在不同頁面的功能如下：
        1. /login：可以進行使用者登入
        2. /register：可以進行使用者註冊
        3. /index：登入後的主頁，可以看到近期討論以及將要討論的相關細節。左邊的 navigator 有以下功能：
            1. 齒輪：更新個人資料（暱稱 or 密碼）、登出
            2. 創建群組：給定群組名字以及（optional）資料集連結便可以創建群組
            3. 加入群組：利用群組代碼加入已建立之群組
            4. 群組：可以選擇想進入的群組
        4. /:UID/:GID：進入群組後的主頁，有以下功能：
            1. 聊天室：可以跟群組內的成員及時通訊
            2. 資料集連結：可以選擇前往該連結或是更新該連結
            3. 來約討論：給定必要的資訊便可以建立討論。
            4. 討論：可以選擇想要進入的討論
            5. 退出群組：離開該群組（同時會自動刪除該用戶創建之討論，但已投票的紀錄將會留著
            6. 回上一頁：回到/index
        5. /:UID/:GID/:DID：進入討論後的主頁，其中括號內為創建者才有的權限，有以下功能：
            1. 討論內容：查看（編輯）主題以及內容
            2. 討論時間：查看可以進行投票的選項以及進行投票，在 deadline 過後也可以看到每個選項的票數，（為避免同票，創建者需要進行確認）。目前是匿名投票。
            3. 討論地點：查看可以進行投票的選項以及進行投票，在 deadline 過後也可以看到每個選項的票數，（為避免同票，創建者需要進行確認）。目前是匿名投票。
            4. 回上一頁：回到/:UID/:GID
        6. 因為我們使用 websocket，故一些按鈕需要花費較長的時間等待頁面的跳轉，請有耐心，比如登入、進入群組後回到主頁...。
