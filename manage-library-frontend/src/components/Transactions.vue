<script setup>
import { ref, watch, nextTick } from "vue"
import { Toaster, toast } from "vue-sonner"
import Swal from 'sweetalert2';
import { useSocketStore } from "../stores/socket.store";
import transactionService from "@/services/transaction.service";
import TransactionCard from "./TransactionCard.vue";
import AddTransaction from "./AddTransaction.vue";
// service
// card 
const socketStore = useSocketStore()

const renderComponent = ref(true)

socketStore.io.on('updateTransaction', async () => {
    toast.warning("Có giao dịch mới")
    await fetchTransaction()
})

socketStore.io.on('updateStatus', async () => {
    toast.warning("Có giao dịch thay đổi trạng thái")
    await fetchTransaction()
})
const allTransactions = ref()
const transactionStatus = ref('Active')

async function fetchTransaction() {
    renderComponent.value = false
    await nextTick()
    try {
        allTransactions.value = await transactionService.getAllTransactions()
        console.log(allTransactions.value);
        await allTransactions.value.sort((a, b) => {
            return (new Date(b.fromDate)) - (new Date(a.fromDate))
        })
    } catch (err) {
        console.log(err);
    }
    renderComponent.value = true
}

await fetchTransaction()
let allTransactionsFilted = allTransactions.value

watch(allTransactions, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (transactionStatus.value == 'Active') {
        allTransactionsFilted = allTransactions.value
    } else {
        allTransactionsFilted = allTransactions.value.filter((transaction) => transaction.transactionStatus == transactionStatus.value)
    }
    renderComponent.value = true
})

watch(transactionStatus, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (value == 'Active') {
        allTransactionsFilted = allTransactions.value
    } else {
        allTransactionsFilted = allTransactions.value.filter((transaction) => transaction.transactionStatus == value)
    }
    renderComponent.value = true
})

</script>

   
<template>
    <Toaster richColors />
    <div class="container mt-5">
        <div class="row">
            <h1>Tổng số giao dịch: {{ allTransactions.length }}</h1>
        </div>
        <div class="row my-4">
            <div class="col-4">
                <select v-model="transactionStatus" class="form-select" aria-label="Default select example">
                    <option value="Active">Chọn trạng thái giao dịch</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="accepted">Đã nhận</option>  
                    <option value="rejected">Đã từ chối</option>
                </select>
                
            </div>
            <div class="col btn-group">
               <router-link
      to="/transactions/add"
      class="btn custom-btn"   
      
    >
      Thêm mới
    </router-link>
            </div>
        </div>
        <div class="row">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Người mượn</th>
                        <th scope="col">Nhân viên</th>
                        <th scope="col">Tên sách</th>                        
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian mượn</th>
                        <th scope="col">Thời gian trả</th>
                        <th scope="col">Cập nhật vào</th>
                    </tr>
                </thead>
                <tbody v-if="renderComponent">
                    <TransactionCard :transaction="transaction" v-for="transaction in allTransactionsFilted"></TransactionCard>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin-top: 60px!important;
}

.custom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #09308a;
  color: white;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover {
  background-color: #2a4c9b;
  color: #fcfafa;
}

.custom-btn.active {
  background-color: #c8e8f4;
  transform: translateY(-2px);
}

.custom-btn:focus {
  box-shadow: none;
}   



</style>