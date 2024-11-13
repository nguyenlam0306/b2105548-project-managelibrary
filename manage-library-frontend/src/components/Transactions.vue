<script setup>
import { ref, watch, nextTick } from "vue"
import { Toaster, toast } from "vue-sonner"
import Swal from 'sweetalert2';
import { useSocketStore } from "../stores/socket.store";
import transactionService from "@/services/transaction.service";
// service
// card 
const socketStore = useSocketStore()

const renderComponent = ref(true)

socketStore.io.on('updateBook', async () => {
    toast.warning("Có giao dịch mới")
    await fetchTransaction()
})

socketStore.io.on('updateStatus', async () => {
    toast.warning("Có giao dịch thay đổi trạng thái")
    await fetchTransaction()
})
const allTransactions = ref()
const transactionStatus = ref('all')

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
    if (transactionStatus.value == 'all') {
        allTransactionsFilted = allTransactions.value
    } else {
        allTransactionsFilted = allTransactions.value.filter((transaction) => transaction.transactionStatus == transactionStatus.value)
    }
    renderComponent.value = true
})

watch(transactionStatus, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (value == 'all') {
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
                    <option value="all">Chọn trạng thái giao dịch</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="accepted">Đã tiếp nhận</option>                    
                </select>
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
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian mượn</th>
                        <th scope="col">Cập nhật lúc</th>
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

</style>