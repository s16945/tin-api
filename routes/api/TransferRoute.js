const express = require('express');
const router = express.Router();

const transferApiController = require('../../api/TransferAPI');

router.get('/', transferApiController.getTransfers);
router.get('/:transferId', transferApiController.getTransferById);
router.post('/', transferApiController.createTransfer);
router.put('/:transferId', transferApiController.updateTransfer);
router.delete('/:transferId', transferApiController.deleteTransfer);
router.delete('/', transferApiController.deleteManyTransfers);

module.exports = router;

