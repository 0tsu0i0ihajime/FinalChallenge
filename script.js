var local_db = new Dexie("VisitorsDataBase");
local_db.version(1).stores({
    Visitors: "id, class, name, place"
});
function bulkPutData(){
    local_db.Visitors
    .bulkPut([
        {id:"D4A65B7E-2BBA-435E-A676-B3CE9517E926", class:"3E11", name:"KK", place:"203"},
        {id:"DA66VZC4-14RA-UCI8-LEO2-AJVJXOA3578V", class:"2C11", name:"KT", place:"2C"},
        {id:"5AG4644B-4SGE-JSIS-2Z2BEG5AFGE4GS4G4", class:"2C08", name:"OT", place:"104"}
    ])
    .then(()=>{
        console.log('data追加成功');
    })
        .catch((error)=>{
          console.error(error);
        });
    }
    function deleteData(){
      local_db.delete()
        .then(()=>{
          console.log('Database successfully deleted');
        })
        .catch((error)=>{
          console.error(error);
        })
    }
    const QrcodeStream = window.VueQrcodeReader.QrcodeStream;
    new Vue({
      el:'#app',
      components:{
        'qrcode-stream':QrcodeStream,
      },
      data:{
        result:'',
        error:'',
        camera: 'auto',
        JTFPause:false,
        DPause:false,
        FullscreenChange:true
      },
      methods:{
        async onInit(promise){
          try{
            await promise
          }catch(error){
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: カメラへのアクセス権を付与する必要があります。"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: この端末にはカメラはありません。"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: HTTPSやlocalhostのようなセキュリティー環境が必要です。"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: カメラを既に使用していますか？"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: カメラが適切ではありません。"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: このブラウザではStream APIがサポートされていません。"
        } else if (error.name === 'OverconstrainedError'&&this.camera === 'auto'){
          this.error = "ERROR: お使いの端末には前面カメラが搭載されていないようです。"
        } else if (error.name === 'OverconstrainedError'&&this.camera === 'rear'){
          this.error = "ERROR: お使いの端末には背面カメラがないようです。"
        }
      }
    },
        async onDecode(result){
          this.result=result;
          if(this.result !==null){
            local_db.Visitors.get(result)
              .then((visitor)=>{
                if(visitor.name !== null){
                console.log('処理開始'+ visitor.place);
                var LAE = document.getElementById("LA");
                LAE.innerText = visitor.name + '、' + visitor.place;
                  this.JTFPause = true;
                  this.pause();
                  setTimeout(()=>{
                  this.unpause()
                  this.JTFPause = false
                  LAE.innerText = '';
                },1000);
              }
              })
              .catch((error)=>{
                console.error(error);
                this.DPause = true
                this.pause();
                setTimeout(()=>{
                  this.unpause()
                  this.DPause =false
                },1000)
              })
          }
        },
        onFullChange(){
          $("#Change").toggleClass("normal","fullscreen");
          this.FullscreenChange = true;
        },
        onDefaultChange(){
          $("#Change").toggleClass("normal","fullscreen");
          this.FullscreenChange=false;
        },
        unpause(){
          this.camera = 'auto';
        },
        pause(){
          this.camera = 'off';
        },onFrontChange(){
          if(this.camera == 'auto'||this.camera == 'off'){
            this.camera = 'front'
          }else{
            this.camera = 'auto'
          }
        },
   }
  })
