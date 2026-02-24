using static TaskManagement.Server.Design_Pattern.All_Design_Pattern.ThisClassCreatedOnlyToKeepExampleWithLimitForAdapterDesignPatternImplementation;

namespace TaskManagement.Server.Design_Pattern
{
    public class All_Design_Pattern
    {

        #region SingletonDesignPattern
        public class ThisClassCreatedOnlyToKeepExampleWithLimitForSingletonDesignPattern
        {
            public sealed class SingletonLogger
            {
                private static readonly SingletonLogger _logger = new SingletonLogger();
                private SingletonLogger() { }
                public static SingletonLogger loggerIntance => _logger;

            }
        }
        #endregion


        #region  FactoryMethodImplementation
        public class ThisClassCreatedOnlyToKeepExampleWithLimitForFactoryMethod
        {

            public interface IPayment
            {
                void Pay();
            }

            public class UpiPayment : IPayment
            {
                public void Pay() => Console.WriteLine("Make UpiPayment Pament");
            }

            public class PhonePayment : IPayment
            {
                public void Pay() => Console.WriteLine("Make PhonePayment Pament");
            }


            // Future Extension Class
            public class PaytmPayment : IPayment
            {
                public void Pay() => Console.WriteLine("Make PaytmPayment Pament");
            }

            public class PaymentFactory
            {
                public static IPayment CreatePayment(string paymentType)
                {
                    switch (paymentType)
                    {
                        case "UPI":
                            return new UpiPayment();
                        case "PhonePay":
                            return new PhonePayment();
                        default:
                            return null;
                    }
                }
            }

            public class Program
            {
                public void Main()
                {
                    IPayment upiPayment = PaymentFactory.CreatePayment("UPI");
                    upiPayment.Pay();
                }

            }
        }

        #endregion


        #region AbstractFactoryMethodImplemenatition
        public class ThisClassCreatedOnlyToKeepExampleWithLimitForAbstractFactoryMethodImplemenatition
        {
            public interface ITaxCalculation
            {
                void CalculateTax(decimal amout);
            }

            public interface IPaymentProcessor
            {
                void MakePayment(decimal amout);
            }

            // for Us or any other country using same tax calculation method
            public class SalesTaxCalculation : ITaxCalculation
            {
                void ITaxCalculation.CalculateTax(decimal amout)
                {
                    Console.WriteLine("Make SaleTax Calculation");
                }
            }

            // for india or any other country using same tax calculation method
            public class GstTaxCalculation : ITaxCalculation
            {
                void ITaxCalculation.CalculateTax(decimal amout)
                {
                    Console.WriteLine("Make GstTaxCalculation Calculation");
                }
            }

            public class CreditCartPayment : IPaymentProcessor
            {
                void IPaymentProcessor.MakePayment(decimal amout)
                {
                    Console.WriteLine("Make CreditCartPayment Payment");
                }
            }

            public class UpiPayment : IPaymentProcessor
            {
                void IPaymentProcessor.MakePayment(decimal amout)
                {
                    Console.WriteLine("Make UpiPayment Payment");
                }
            }

            public interface IBusinessFactory
            {
                IPaymentProcessor CreatePaymentProcessor();
                ITaxCalculation CreateTaxProcessor();
            }

            public class USBusinessFactory : IBusinessFactory
            {
                IPaymentProcessor IBusinessFactory.CreatePaymentProcessor()
                {
                    return new CreditCartPayment();
                }

                ITaxCalculation IBusinessFactory.CreateTaxProcessor()
                {
                    return new SalesTaxCalculation();
                }
            }

            public class INBusinessFactory : IBusinessFactory
            {
                IPaymentProcessor IBusinessFactory.CreatePaymentProcessor()
                {
                    return new UpiPayment();
                }

                ITaxCalculation IBusinessFactory.CreateTaxProcessor()
                {
                    return new GstTaxCalculation();
                }
            }

            public class OrderService
            {
                IPaymentProcessor _paymentProcessor;
                ITaxCalculation _taxCalculation;
                public OrderService(IBusinessFactory factory)
                {
                    _paymentProcessor = factory.CreatePaymentProcessor();
                    _taxCalculation = factory.CreateTaxProcessor();
                }

                public void MakePayment(decimal amount)
                {
                    _taxCalculation.CalculateTax(amount);
                    _paymentProcessor.MakePayment(amount);
                    //var tax = _taxCalculation.CalculateTax(amount);
                    //_paymentProcessor.MakePayment(tax + amount);

                }
            }

            public class Program
            {
                public static void Main()
                {
                    IBusinessFactory _usBusinessFactory = new USBusinessFactory();
                    OrderService _orderService = new OrderService(_usBusinessFactory);
                    _orderService.MakePayment(1000);
                }
            }

        }
        #endregion

        #region AdapterDesignPatternImplementation

        public class ThisClassCreatedOnlyToKeepExampleWithLimitForAdapterDesignPatternImplementation
        {

            public interface IPaymentSevice
            {
                void Pay(decimal amount);
            }

            public class ThirdPartyPaymentGateway
            {
                public void InitiatePayment(decimal amount)
                {
                }
            }

            public class PaymentAdapter : IPaymentSevice
            {
                ThirdPartyPaymentGateway _thirdPartyPaymentGateway;
                public PaymentAdapter(ThirdPartyPaymentGateway thirdPartyPaymentGateway)
                {
                    _thirdPartyPaymentGateway = thirdPartyPaymentGateway;
                }
                public void Pay(decimal amount)
                {

                }

                void IPaymentSevice.Pay(decimal amount)
                {
                    _thirdPartyPaymentGateway.InitiatePayment(amount);
                    Console.WriteLine("Payment method of ThirdPartyPaymentGateway system called");
                }
            }

            public class OrderService
            {
                IPaymentSevice _paymentSevice;
                public OrderService(IPaymentSevice paymentSevice)
                {
                    _paymentSevice = paymentSevice;
                }

                public void MakePayment(decimal amount)
                {
                    _paymentSevice.Pay(amount);
                    Console.WriteLine("Payment Successfull");
                }
            }

            public class Program
            {
                public static void Main()
                {
                    ThirdPartyPaymentGateway thirdPartyPaymentGateway = new ThirdPartyPaymentGateway();
                    IPaymentSevice paymentSevice = new PaymentAdapter(thirdPartyPaymentGateway);
                    OrderService orderService = new OrderService(paymentSevice);
                    orderService.MakePayment(1000);
                }

            }
        }

        #endregion
    }
}
