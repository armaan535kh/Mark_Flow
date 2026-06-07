import { useState } from "react";
import axios from "axios";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
Legend,
} from "recharts";

function App() {
const [file, setFile] = useState(null);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

const handleUpload = async () => {
if (!file) return;


const formData = new FormData();
formData.append("file", file);

setLoading(true);

try {
  const response = await axios.post(
    "https://mark-flow-2.onrender.com/upload",
    formData
  );

  setResult(response.data);
} catch (error) {
  console.error(error);
  alert("Upload failed");
}

setLoading(false);


};

const downloadMarkdown = () => {
if (!result) return;


const blob = new Blob([result.markdown], {
  type: "text/markdown",
});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "MarkFlow_Output.md";
a.click();

URL.revokeObjectURL(url);


};

const chartData = result
? [
{
metric: "Characters",
Original: result.metrics.original_characters,
Markdown: result.metrics.markdown_characters,
},
{
metric: "Tokens",
Original: result.token_metrics.original_token_count,
Markdown: result.token_metrics.markdown_token_count,
},
]
: [];

const cardStyle = {
background: "#ffffff",
padding: "24px",
borderRadius: "20px",
minWidth: "220px",
textAlign: "center",
boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
border: "1px solid #e2e8f0",
flex: "1",
};

return (
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom, #f8fafc, #eef6ff)",
color: "#0f172a",
padding: "40px",
fontFamily: "Arial, sans-serif",
}}
>
{/* Hero Section */}
<div
style={{
textAlign: "center",
marginBottom: "40px",
}}
>
<h1
style={{
fontSize: "60px",
marginBottom: "10px",
color: "#1d4ed8",
}}
>
   MarkFlow </h1>


    <div
      style={{
        display: "inline-block",
        background: "#dcfce7",
        color: "#166534",
        padding: "8px 16px",
        borderRadius: "999px",
        fontWeight: "bold",
        marginBottom: "20px",
      }}
    >
      AI Infrastructure Project
    </div>

    <h2
      style={{
        color: "#2563eb",
        fontWeight: "normal",
      }}
    >
      AI Context Compression Engine
    </h2>

    <p
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        color: "#475569",
        lineHeight: "1.7",
        fontSize: "18px",
      }}
    >
      Transform noisy PDF documents into structured,
      AI-friendly Markdown while measuring compression,
      token efficiency, and context quality.
    </p>

    <div
      style={{
        background: "#dbeafe",
        color: "#1d4ed8",
        padding: "15px",
        borderRadius: "14px",
        maxWidth: "900px",
        margin: "20px auto",
        fontWeight: "bold",
      }}
    >
      PDF → Extract → Clean → Structure →
      Markdown → Analytics
    </div>
  </div>

  {/* Upload Section */}
  <div
    style={{
      background: "#ffffff",
      padding: "30px",
      borderRadius: "24px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid #e2e8f0",
      textAlign: "center",
      marginBottom: "40px",
    }}
  >
    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setFile(e.target.files[0])}
    />

    <br />
    <br />

    <button
      onClick={handleUpload}
      disabled={!file || loading}
      style={{
        background: "#2563eb",
        color: "white",
        padding: "12px 24px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {loading ? "Processing..." : "Process PDF"}
    </button>

    {file && (
      <p
        style={{
          marginTop: "15px",
          color: "#475569",
        }}
      >
        📄 Selected: {file.name}
      </p>
    )}
  </div>

  {result && (
    <>
      <h2
        style={{
          color: "#1d4ed8",
          marginBottom: "20px",
        }}
      >
        📊 Compression Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          <h3>Original Characters</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
            }}
          >
            {result.metrics.original_characters}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Markdown Characters</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
            }}
          >
            {result.metrics.markdown_characters}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Reduction %</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
            }}
          >
            {result.metrics.reduction_percentage.toFixed(2)}%
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Original Tokens</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
            }}
          >
            {result.token_metrics.original_token_count}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Markdown Tokens</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
            }}
          >
            {result.token_metrics.markdown_token_count}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Compression</h3>
          <h1
            style={{
              color: "#22c55e",
              fontSize: "42px",
            }}
          >
            {Math.abs(
              result.token_metrics
                .token_reduction_percentage
            ).toFixed(1)}
            %
          </h1>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          📈 Compression Comparison
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
                dataKey="Original"
                fill="#7b9f83"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="Markdown"
                fill="#5cd273"
                radius={[8, 8, 0, 0]}
              />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Download Button */}
      <div
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <button
          onClick={downloadMarkdown}
          style={{
            background: "#16a34a",
            color: "white",
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ⬇ Download Markdown
        </button>
      </div>

      {/* Markdown Preview */}
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          📄 Markdown Preview
        </h2>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            overflowX: "auto",
            color: "#0f172a",
            textAlign: "left",
            lineHeight: "1.7",
            fontSize: "14px",
            margin: 0,
          }}
        >
          {result.markdown}
        </pre>
      </div>
    </>
  )}
</div>


);
}

export default App;
