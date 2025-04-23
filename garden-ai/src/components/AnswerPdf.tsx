// src/components/AnswerPdf.tsx
'use client'

import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

interface AnswerPdfProps { answer: string }

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, lineHeight: 1.4, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 10 },
  paragraph: { marginBottom: 6 }
})

export default function AnswerPdf({ answer }: AnswerPdfProps) {
  // split on blank lines for paragraphs
  const paras = answer.split(/\n\s*\n/)
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Garden AI Answer</Text>
        {paras.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}
      </Page>
    </Document>
  )
}
