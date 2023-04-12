Public Class Form1

    Private Sub btnConvert_Click(sender As Object, e As EventArgs) Handles btnConvert.Click
        Dim num As Integer = txtNum.Text
        Dim dec As Integer

        ' Convert from binary to decimal
        If rdbBinary.Checked Then
            Dim bit As Integer = 1
            While num > 0
                dec += (num Mod 10) * bit
                num = num \ 10
                bit *= 2
            End While
        End If

        ' Convert from hexadecimal to decimal
        If rdbHexadecimal.Checked Then
            Dim hex As String = num.ToString()
            For i As Integer = hex.Length - 1 To 0 Step -1
                Select Case hex(i)
                    Case "0"
                        dec += 0
                    Case "1"
                        dec += 1 * Math.Pow(16, hex.Length - 1 - i)
                    Case "2"
                        dec += 2 * Math.Pow(16, hex.Length - 1 - i)
                    Case "3"
                        dec += 3 * Math.Pow(16, hex.Length - 1 - i)
                    Case "4"
                        dec += 4 * Math.Pow(16, hex.Length - 1 - i)
                    Case "5"
                        dec += 5 * Math.Pow(16, hex.Length - 1 - i)
                    Case "6"
                        dec += 6 * Math.Pow(16, hex.Length - 1 - i)
                    Case "7"
                        dec += 7 * Math.Pow(16, hex.Length - 1 - i)
                    Case "8"
                        dec += 8 * Math.Pow(16, hex.Length - 1 - i)
                    Case "9"
                        dec += 9 * Math.Pow(16, hex.Length - 1 - i)
                    Case "A"
                        dec += 10 * Math.Pow(16, hex.Length - 1 - i)
                    Case "B"
                        dec += 11 * Math.Pow(16, hex.Length - 1 - i)
                    Case "C"
                        dec += 12 * Math.Pow(16, hex.Length - 1 - i)
                    Case "D"
                        dec += 13 * Math.Pow(16, hex.Length - 1 - i)
                    Case "E"
                        dec += 14 * Math.Pow(16, hex.Length - 1 - i)
                    Case "F"
                        dec += 15 * Math.Pow(16, hex.Length - 1 - i)
                End Select
            Next
        End If

        ' Convert from decimal to binary or hexadecimal
        If rdbDecimal.Checked Then
            Dim base As Integer = 2
            If rdbHexadecimal2.Checked Then
                base = 16
            End If

            Dim result As String = ""
            While dec > 0
                Dim remainder As Integer = dec Mod base
                If remainder < 10 Then
                    result = remainder.ToString() & result
                Else
                    Select Case remainder
                        Case 10
                            result = "A" & result
                        Case 11
                            result = "B" & result
                        Case 12
                            result = "C" & result
                        Case 13
                            result = "D" & result
                        Case 14
                            result = "E" & result
                        Case 15
                            result = "F" & result
                    End Select
                End If
                dec = dec \ base
            End While
            txtResult.Text3W