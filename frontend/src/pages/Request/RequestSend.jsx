import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { reset, requestSend } from '../../features/request/requestSlice'
import Loader from '../../components/Loader/Loader'
import { optionsDate, optionsTime, IndianRupee } from '../utils/helpOptions'

const RequestSend = () => {
  const dispatch = useDispatch()
  const { send, isLoading } = useSelector((state) => state.request)

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(requestSend())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell tableHead'>Send To</TableCell>
            <TableCell className='tableCell tableHead'>Send At</TableCell>
            <TableCell className='tableCell tableHead'>Status</TableCell>
            <TableCell className='tableCell tableHead'>Amount</TableCell>
            <TableCell className='tableCell tableHead'>Paid At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {send.map((transaction) => (
            <TableRow key={transaction?._id}>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  {transaction?.receiver?.image ? (           
                  <img
                    src={transaction?.receiver?.image}
                    alt={transaction?.receiver?.name}
                    className='image'
                  />
                  ):(
                  <img
                    src={'/avatar.png'}
                    alt={transaction?.receiver?.name}
                    className='image'
                  />
                  )
                }
                  {transaction?.receiver?.name}
                </div>
              </TableCell>
              <TableCell className='tableCell date'>
                {new Date(transaction?.createdAt).toLocaleString(
                  'en-IN',
                  optionsDate
                )}
                <div className='time'>
                  at{' '}
                  {new Date(transaction?.createdAt).toLocaleString(
                    'en-IN',
                    optionsTime
                  )}
                </div>
              </TableCell>
              <TableCell className='tableCell'>
                <span
                  className={`${transaction?.status === 'pending' && 'pending'}
                ${transaction?.status === 'accepted' && 'accepted'}
                ${transaction?.status === 'cancel' && 'cancel'}`}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className='tableCell'>
                {IndianRupee?.format(transaction?.amount)}
              </TableCell>
              <TableCell className='tableCell date'>
                {transaction?.status === 'accepted' ? (
                  <>
                    {new Date(transaction?.updatedAt).toLocaleString(
                      'en-IN',
                      optionsDate
                    )}

                    <div className='time'>
                      at{' '}
                      {new Date(transaction?.updatedAt).toLocaleString(
                        'en-IN',
                        optionsTime
                      )}
                    </div>
                  </>
                ) : (
                  'not paid'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RequestSend
