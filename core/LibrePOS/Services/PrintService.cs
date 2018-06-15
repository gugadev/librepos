using System.Drawing;
using System.Drawing.Printing;
using Pos.Types;

namespace Pos.Services
{
    class Fonts
    {
        public static Font Regular = Regular = new Font("Arial", 12, FontStyle.Regular);
        public static Font Bold = new Font("Arial", 12, FontStyle.Bold);
    }

    public class PrintService: IPrintService
    {
        private PrintDocument pd;
        private Order Order { get; set; }

        public PrintService(Order order)
        {
            Order = order;
            Init();
        }

        public void PrintTicket()
        {
            pd.Print();
        }
    
        private void Init()
        {
            pd = new PrintDocument();
            PaperSize ps = new PaperSize("", 420, 540);
            pd.PrintController = new StandardPrintController();  
            pd.DefaultPageSettings.Margins.Left = 0;  
            pd.DefaultPageSettings.Margins.Right = 0;  
            pd.DefaultPageSettings.Margins.Top = 0;  
            pd.DefaultPageSettings.Margins.Bottom = 0;  
            pd.DefaultPageSettings.PaperSize = ps;
            pd.PrintPage += new PrintPageEventHandler(PrintHandler);
        }

        private StringFormat CenterText()
        {
            StringFormat sf = new StringFormat();
            sf.Alignment = StringAlignment.Center;
            sf.LineAlignment = StringAlignment.Center;
            return sf;
        }

        private void PrintHandler(object sender, PrintPageEventArgs e)
        {
            Graphics g = e.Graphics;
            SolidBrush sb = new SolidBrush(Color.Black);

            g.DrawString("Boleta de venta", Fonts.Bold, sb, 10, 120, CenterText());
            g.DrawString("-----------------------------------", Fonts.Regular, sb, 10, 120);

            g.Dispose(); // luego de generar el ticket
        }
    }
}