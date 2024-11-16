<script setup>
import { defineProps, ref, computed, watch } from "vue"
import transactionService from "@/services/transaction.service";
import BookService from "@/services/book.service";
import { useSocketStore } from "../stores/socket.store";
const bookService = new BookService()

// const transactionService = new TransactionService()
const status = {
    active:  "Đã sẵn sàng",
    processing: "Đang xử lý",
    accepted: "Đã xử lý",
    rejected: "Đã từ chối",
}

const props = defineProps(['transaction'])

const sumMoney = ref(0)

const formatPrice = (price) => {
    let formatPrice = price
    if (typeof formatPrice === 'number' && Number.isInteger(formatPrice)) {
        formatPrice = formatPrice.toString()
    }
    let pos = 3;
    while (pos < formatPrice.length) {
        formatPrice = formatPrice.slice(0, -pos) + '.' + formatPrice.slice(-pos, formatPrice.length)
        pos += 4
    }
    return formatPrice
}

const transactionStatus = ref(props.transaction.transactionStatus)

watch(transactionStatus, async (transactionStatus) => {
    await changeStatus(transactionStatus)
})

async function changeStatus(transactionStatus) {
    document.getElementById(`close${props.transaction._id}`).click()
    try {
        await transactionService.updateTransactionStatus(props.transaction._id, transactionStatus)
        const socketStore = useSocketStore()
        socketStore.io.emit('changeStatus')
    } catch (err) {
        console.log(err);
    }
}

</script>

<template>
    <!-- Button trigger modal -->
    <tr data-bs-toggle="modal" :data-bs-target="`#Modal${transaction._id}`">
        <th scope="row">...{{ transaction._id.substr(transaction._id.length - 5) }}</th>
        <td>{{ transaction.borrowerName }}</td>
        <td>{{ transaction.borrowerId }}</td>
        <td>{{ transaction.bookName }}</td>
        <td>{{ formatPrice(sumMoney) }}đ</td>
        <td>{{transaction.transactionStatus }}</td>
        <td>{{ (new Date(transaction.fromDate)).toLocaleDateString() }} {{ (new Date(transaction.fromDate)).toLocaleTimeString()
        }}
        </td>
        <td>{{ (new Date(transaction.toDate)).toLocaleDateString() }} {{ (new Date(transaction.toDate)).toLocaleTimeString()
        }}
        </td>
        <td>{{ transaction.returnDate ? (new Date(transaction.returnDate)).toLocaleDateString()  : (new Date(transaction.returnDate)).toLocaleDateString()  }}</td>
    </tr>


    <!-- Modal -->
    <div class="modal fade" :id="`Modal${transaction._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Giao dịch {{ transaction._id }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>Khách hàng: {{ transaction.borrowerName }}</h3>
                    <h4>Chi tiết </h4>
                    <hr class="my-4">
                    <!-- <transactionDetailCard v-for="d in transaction.detail" :detail="d"></transactionDetailCard> -->
                    <h5 class="h5">Tổng cộng: {{ formatPrice(sumMoney) }}đ</h5>
                    <h5 class="h5">Trạng thái:</h5>
                    <h5 class="h5">Nhân viên: {{ transaction.borrowerId }}</h5>
                    <div class="col-3 my-2">
                        <select v-model="transactionStatus" class="form-select" aria-label="Default select example">
                            <option value="processing">Đang xử lý</option>
                            <option value="accepted">Đã nhận</option>   
                            <option value="rejected">Đã từ chối</option>                     
                        </select>
                    </div>                  
                </div>
                <div class="modal-footer">
                    <button :id="`close${props.transaction._id}`" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

h3,
h4,
h5 {
    color: #1e62a2;
}
</style>