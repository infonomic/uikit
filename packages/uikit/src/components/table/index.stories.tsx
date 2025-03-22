// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableHeadingCell,
  TableRow,
} from './index'

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div className="mb-6">
        <div className="max-w-[960px] ml-auto mr-auto">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadingCell scope="col" className="p-4">
                    <span>Check</span>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 1</p>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 2</p>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 3</p>
                  </TableHeadingCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="w-4 p-4">
                    <span>Check</span>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4">
                    <span>Check</span>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4">
                    <span>Check</span>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4">
                    <span>Check</span>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableHeadingCell scope="col" className="p-4">
                    <span>Check</span>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 1</p>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 2</p>
                  </TableHeadingCell>
                  <TableHeadingCell scope="col" className="p-4">
                    <p>Heading 3</p>
                  </TableHeadingCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
