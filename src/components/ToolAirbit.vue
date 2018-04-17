<template>
  <div class="container">
    <div class="row padded-14">
      <div class="col-6 col-md-6 col-sm-4"> 
        <a href="http://herbert-saladar.com/" targe="_blank" class="float-left" style="width:100%">
          <div  style="background:url(/images/me-gray.png)  no-repeat; width:90px; height: 90px; background-size:cover; border-radius:100px; background-position: -14px;"></div>
        </a>
      </div>
      <div class="col-6 col-md-6 col-sm-4"> 
        <a href="https://www.bitbackoffice.com/" targe="_blank" class="float-right">
            <img src="/images/logo-airbit.png" class="float-right" width="90px;">
        </a>
      </div>
    </div>
    <div class="row padded-14">
      <div class="row padded-14 bordered-gray margin-bottom ">
        <div class="form-group col-md-12 top">
           <h2> Airbit Daily Rewards Generator </h2>
        </div>
        <div class="form-group col-md-3">
          <label for="numberOfAccounts">Select of Memberships Type</label>
            <select name="accounts" v-model="accountType" class="form-control" v-on:change="getDays()">
              <option value="exec"> Executive </option>
              <option value="corp"> Corporate </option>
              <option value="pro">  Pro </option>
              <option value="silver">  Silver </option>
              <option value="gold">Gold </option>
              <option value="platinum">  Platinum </option>
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="numberOfAccounts">Number of Accounts </label>
            <input type="text" name="numberOfAccounts" class="form-control" placeholder="Number of Accounts" v-model="numberOfAccounts">
        </div>
          <div class="form-group col-md-3">
            <label for="minRewards">Enter Minimum Daily Rewards </label>
            <input type="text" name="minRewards" class="form-control" placeholder="Minimum Daily Rewards" v-model="minRewards">
        </div>
        <div class="form-group col-md-3">
            <label for="maxRewards">Enter Maximum Daily Rewards </label>
            <input type="text" name="maxRewards" class="form-control" placeholder="Minimum Daily Rewards" v-model="maxRewards">
        </div>
        <div class="form-group col-md-12 text-center">
          <button class="btn btn-success " @click="generate()"> Generate </button>
        </div>
      </div>
       <div class="col-md-12 warning text-left text-xs margin-bottom" >
          Disclaimer: This tool is only for demo and reference, all values are speculative, figures does not represent actual values.
      </div>
       <div class="col-md-12 notice text-left text-xs margin-bottom" >
          Soon: Binary Tree Generator Tool.
      </div>
      <div class="col-md-6 center padded-top-30 bitcoin-container">
        <span class="text-xl "> 1 Bitcoin =  ${{bitcoinprice}} </span>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12 ">
              <span class="text-sm"> REWARDS PROGRAM</span>
              <hr>
          </div>
          <div class="col col-xs-6 col-sm-6  col-md-6 text-center">
              <span class="text-sm">TOTAL</span>
              <div class="clearfix"></div>
              <span class="text-lg rewards-label">BUSINESS DAYS</span>
              <div class="clearfix"></div>
              <div class="days">
                <span class="text-xl">{{ days }}</span> 
             </div>
          </div>
          <div class="col col-xs-6 col-sm-6  col-md-6 text-center">
              <span class="text-sm">TOTAL</span>
              <div class="clearfix"></div>
              <span class="text-lg rewards-label">REPURCHASE</span>
              <div class="clearfix"></div>
              <div class="days">
                <span class="text-xl">{{ repurchase }}</span> 
              </div>
          </div>
        </div>      
      </div>
    </div>
    <div class="row ">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-4 ">
            <div class="wallet savings">
                <span class="float-left text-xs">  Savings Wallet </span>
                <div class="clearfix"></div>
                <span class="float-right">
                  B {{ parseFloat( savings / bitcoinprinceFloat).toFixed(8) }}
                </span>
                <div class="clearfix"></div>
                <span class="text-lg float-right">
                    ${{savings.toLocaleString('en-US')}}
                </span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="wallet commission">
              <span class="float-left text-xs"> Commision Wallet </span>
              <div class="clearfix"></div>
              <span class="float-right">
                B {{ parseFloat( comission / bitcoinprinceFloat).toFixed(8) }}
              </span>
              <div class="clearfix"></div>
              <span class="text-lg float-right">
                  ${{comission.toLocaleString('en-US') }}
              </span>
            </div>
          </div>
          <div class="col-md-4 ">
              <div class="wallet rewards">
                <span class="float-left text-xs"> Rewards Wallet </span>
                <div class="clearfix"></div>
                <span class="float-right">
                  B {{ parseFloat( ( rewardsTotal / bitcoinprinceFloat ) * numberOfAccounts ).toFixed(8) }}
                </span>
                <div class="clearfix"></div>
                <span class="text-lg float-right">
                  ${{ ( rewardsTotal  * numberOfAccounts ).toLocaleString('en-US') }}
                </span>
              </div>
          </div>
        </div>
        <div class="row padded-14 total-income">
          <div class="col-md-12 padded-top bordered" v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' ">
            <h5 class="float-right"> Total Income ${{ parseFloat( rewardsTotal * numberOfAccounts ).toLocaleString('en-US') }}</h5>
          </div>
          <div class="col-md-12 padded-top bordered" v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">
            <h5 class="float-right"> Total Income ${{ parseFloat( ( rewardsTotal - ( rewardsTotal * .35 ) )* numberOfAccounts ).toLocaleString('en-US') }}</h5>
          </div>
         </div>
      </div>
      <div class="col-md-4">
        <div class="col-md-12">
            <div class="wallet info">
               <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Membership
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs  ">
                    {{ accountType.toUpperCase() }}
                </div>
              </div>
               <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Investment
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs  ">
                    ${{ investment.toLocaleString('en-US') }}
                </div>
              </div>
              <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    No. Of Accounts
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs  ">
                    {{ numberOfAccounts }}
                </div>
              </div>
              <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Total Investment
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs  ">
                  ${{  parseInt(investment * numberOfAccounts ).toLocaleString('en-US') }}
                </div>
              </div>
              <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Growth
                  </span>
                </div>
                <div class="col col-xs-4  col-md-4 text-xs"  v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' ">
                  ${{  ( rewardsTotal != 0  ? parseFloat( ( rewardsTotal * numberOfAccounts ) - (investment * numberOfAccounts) ).toLocaleString('en-US') : 0 )  }}
                </div>
                <div class="col col-xs-4  col-md-4 text-xs"  v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">
                  ${{  ( rewardsTotal != 0  ? parseFloat( ( ( rewardsTotal - ( rewardsTotal * .35 ) ) * numberOfAccounts ) - (investment * numberOfAccounts) ).toLocaleString('en-US') : 0 )  }}
                </div>
              </div>
               <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Growth %
                  </span>
                </div>
                <div class="col col-xs-4  col-md-4 text-xs"  v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' ">
                {{ ( rewardsTotal != 0  ? parseFloat(( ( rewardsTotal  * numberOfAccounts ) - (investment * numberOfAccounts) ) * 100 /(investment * numberOfAccounts) ).toLocaleString('en-US') : 0 ) }}%
                </div>
                <div class="col col-xs-4  col-md-4 text-xs"  v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">
                {{ ( rewardsTotal != 0  ? parseFloat(( ( ( rewardsTotal - ( rewardsTotal * .35 ) ) * numberOfAccounts ) - (investment * numberOfAccounts) ) * 100 /(investment * numberOfAccounts) ).toLocaleString('en-US') : 0 ) }}%
                </div>
              </div>

              <hr>
              <div class="row">
                <div class="col col-xs-8 col-md-8">
                  <span class="text-xs">
                    Income/Account
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs">
                ${{  parseFloat(rewardsTotal - (rewardsTotal * .35 )) .toLocaleString('en-US')  }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class=" col col-xs-8 col-md-8 ">
                  <span class="text-xs">
                    Repurchase fee
                  </span>
                </div>
                
                <div class="col col-xs-4 col-md-4 text-xs" v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' "> $ 0.00  </div>
                <div class="col col-xs-4 col-md-4 text-xs" v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">
                ${{  parseFloat( rewardsTotal * .35  ).toLocaleString('en-US') }}
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 col col-xs-8">
                  <span class="text-xs">
                    Total Repurchase fee account
                  </span>
                </div>
                <div class="col col-xs-4 col-md-4 text-xs" v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' "> $ 0.00  </div>
                <div class="col col-xs-4 col-md-4 text-xs" v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">
                ${{  parseFloat( rewardsTotal * .35 * numberOfAccounts ).toLocaleString('en-US')  }}
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 col-md-12">
                  <button class="btn btn-success" @click="scrollUp()" > Scroll Up </button>
                </div>
              </div>
           </div>
          </div>
      </div>
    </div>
 
    <div class="row padded-top">  
      <div class="col col-md-2 col-xs-2 text-center">Date </div>
      <div class="col col-md-5 col-xs-5  text-center">Description </div>
      <div class="col col-md-2 col-xs-2  text-center">Credit</div>
      <div class="col col-md-2 col-xs-2  text-center">Repurchase </div>
    </div>
    <div v-for="key in generatedData" class="row generate-row" :class="{ 'bg-green':key.repurchased }">
      <div class="col col-md-2 col-xs-2"> Day {{ key.date }}</div>
      <div class="col col-md-5 col-xs-5">
          Reward Bonus has been <span v-if="key.repurchased"> Debited </span> <span v-if="!key.repurchased"> Credited </span>to your rewards wallet  
      </div>
      <div class="col col-md-2 col-xs-2 text-right"> <span v-if="!key.repurchased"> ${{ key.rewards }} </span> </div>
      <div class="col col-md-2 col-xs-2 text-right"> <span>${{ parseFloat(key.repurchasedvalue).toFixed(2) }} </span> </div>
     
    </div>
    <div class="row">
      <div class="col col-md-2 col-xs-2 text-center">&nbsp;</div>
      <div class="col col-md-5 col-xs-5 text-center">&nbsp;</div>
      <div class="col col-md-2 col-xs-2 text-lg text-right">${{ rewardsTotal.toLocaleString('en-US')  }}</div>
      <div class="col col-md-2 col-xs-2 text-lg text-right" v-if="accountType == 'pro' || accountType == 'exec' || accountType == 'corp' ">${{ (rewardsTotal * .35 ).toLocaleString('en-US')  }} </div>
      <div class="col col-md-2 col-xs-2 text-lg text-right" v-if="accountType == 'silver' || accountType == 'gold' || accountType == 'platinum' "> $ 0.00  </div>

    </div>
    <div class="row text-center">
      <div class="col-12 col-md-12">
        <button class="btn btn-success" @click="scrollUp()" > Scroll Up </button>
      </div>
    </div>

    <div v-if="showModal" >
        <div class="modal-mask " >
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                <h2> Greetings! </h2> 
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  <p>
                    Airbit tool is a Free web application and is made available free of charge. 
                  </p>
                  <p>
                  If you find this helpful on your demo/presentation and personal use please consider a donation to my airbit account <strong> hrbrt-01 </strong> to support this and future projects.
                  </p>
                  <p> Also don't hesitate to send me your feedback and requests here <a href="http://herbert-saladar.com/"> here </a> </p>
                   <p> 
                    Thank you! <i class="fa fa-smile-o"></i>
                  </p>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="btn btn-success" @click="showModal = false"> OK </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ToolAirbit',
  data() {
    return {
      numberOfAccounts : 1,
      showModal : false,
      minRewards : 7,
      maxRewards : 10,
      generatedData : [],
      days : 300,
      repurchase : 75,
      repurchaseTemp : 0,
      isRepurchase : false,
      
      savings : 0,
      comission: 0,
      rewards : 0,
      rewardsTotal : 0,

      income : 0, 
      investment : 1000,
      accountType : 'pro',
      fees : 0,
      bitcoinprice : 0,
      bitcoinprinceFloat : 0,
    }
  },
  methods: {
    generate(){
        this.generatedData = []
        this.rewards = 0
        this.rewardsTotal = 0
        this.savings = 0
        this.income = 0


        var vm = this
  
     for( var x = 1 ; x <= this.days; x++ ){
      var rewards = Number( parseFloat( parseInt(vm.minRewards) + Math.random( ) * (vm.maxRewards - vm.minRewards) ).toFixed(2) )

      var repurchased = false
      var calcIncome = vm.income + rewards
      var calcRewards =  vm.income + rewards 
      var repurchasedValue = 0
      

      vm.repurchaseTemp += rewards
      vm.rewardsTotal += rewards

      if(  vm.accountType == 'exec' || vm.accountType == 'pro' || vm.accountType == 'corp'){
        if( x % 75 == 0){
          repurchased = true
          rewards =  repurchasedValue =   vm.repurchaseTemp  * .35 
          calcIncome = vm.income - rewards
         // calcRewards =  rewards 
          vm.repurchaseTemp = 0
        }
      }
       
       var data = {
          rewards : rewards,
          date :  x,
          repurchased: repurchased,
          income : vm.income,
          repurchasedvalue : repurchasedValue
       }

       vm.generatedData.push( data)
       vm.income = calcIncome
      
       vm.rewards =  calcRewards
       vm.isRepurchase = true

     }

     setTimeout( function(){
      // vm.showModal =  true 
     }, 5000)

      $('html, body').animate({
        scrollTop: $(".total-income").offset().top
      }, 1000);

    },
    scrollUp(){
       $('html, body').animate({
        scrollTop: $(".top").offset().top
      }, 1000);
    },
    getDays(){
      switch( this.accountType ){
        case 'pro':
          this.days = 300
          this.repurchase = 75
          this.maxRewards = 10
          this.minRewards = 7
          this.investment = 1000
        break;
        case 'exec':
          this.days = 150
          this.repurchase = 75
          this.maxRewards = 3
          this.minRewards = 1
          this.investment = 250
        break;
        case 'corp':
          this.days = 225
          this.repurchase = 75
          this.maxRewards = 6
          this.minRewards = 3
          this.investment = 500
        break;
        case 'silver':
          this.days = 375
          this.repurchase = 0
          this.maxRewards = 90
          this.minRewards = 60
          this.investment = 15000
        break;
        case 'gold':
          this.days = 425
          this.repurchase = 0
          this.maxRewards = 190
          this.minRewards = 120
          this.investment = 31000
        break;
        case 'platinum':
          this.days = 525
          this.repurchase = 0
          this.maxRewards = 380 
          this.minRewards = 240
          this.investment = 63000
        break;
      }
    },
    getBitcoinPrice(){
      var vm = this
       this.$http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(function (response) {
                  console.log( response.body.bpi.USD.rate )
                  vm.bitcoinprice =  response.body.bpi.USD.rate 
                  vm.bitcoinprinceFloat =response.body.bpi.USD.rate_float 
                })
    }
  },
  created(){
    this.getBitcoinPrice()
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.padded{
  padding:20px;
}
.padded-14{
  padding:14px;
}
.padded-top{
  padding-top:20px;
}
.padded-top-30{
  padding-top:30px;
}
.text-xl{
  font-size:2em;
  font-weight: 600;
}
.text-lg{
  font-size:1.5em;
  font-weight: 600;
}
.text-sm{
  font-size: .9em;
  font-weight: 500;
  color:#59d7be;
}
.text-xs{
  font-size: 12px;
  font-weight: 500;
  color:black;
}

label {
  font-size:10px;
  min-height: 24px;
}
.rewards-label{
  display: inline-block;
  min-height: 80px;
}
.bitcoin-container{
  background-color: #384555;
  padding-top:90px;
  text-align:center;
  color:white;
}
.bg-green{
  background-color:green;
  color: white;
}
.generate-row{
  border-radius: 30px;
  padding:5px;
}
.days{
  background-color: #eef1f8;
  border: solid 10px black;
  min-height: 150px;
  border-radius: 150px;
  padding: 40px 20px;
  width: 150px;
  display: block;
  margin: 0 auto;
}
.wallet{
  padding:20px;
  min-height: 145px;
  border: solid 1px black;
  margin-top:20px;
}
.bordered {
  border: solid thin black;
}
.bordered-gray{
  border: solid thin #59d7be;
}
.wallet.savings{
  border-top-color: red !important;
  border-top-width: 10px;
}
.wallet.rewards{
  border-top-color: blue !important;
  border-top-width: 10px;
}
.wallet.commission{
  border-top-color: green !important;
  border-top-width: 10px;
}
.wallet.info{
  border-top-color: pink !important;
  border-top-width: 10px;
}
.warning{
  background-color:red;
  color:white;
  padding:10px;
}
.notice{
  background-color:green;
  color:white;
  padding:10px;
}
.margin-bottom{
  margin-bottom: 20px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
